import { readFileSync } from "node:fs";
import { LATEST_API } from "../src/lib/constants";
import { expect, test } from "./fixtures";

const RELEASE = JSON.parse(readFileSync("src/lib/fixtures/release.json", "utf8"));

const MAC_SAFARI_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";

const PAGES = [
  { path: "/download/", detected: "Your system: Windows", heading: "Shellvia for Windows" },
  {
    path: "/fr/telecharger/",
    detected: "Votre système : Windows",
    heading: "Shellvia pour Windows",
  },
] as const;

function newerRelease() {
  return {
    ...RELEASE,
    tag_name: "v0.4.0",
    assets: RELEASE.assets.map((a: { name: string; browser_download_url: string }) => ({
      name: a.name.replaceAll("0.3.0", "0.4.0"),
      browser_download_url: a.browser_download_url.replaceAll("0.3.0", "0.4.0"),
    })),
  };
}

for (const { path, detected, heading } of PAGES) {
  test(`${path} shows the detected block and five installer rows`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByText(detected)).toBeVisible();
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await expect(page.locator("#others a[title]")).toHaveCount(5);
    await expect(page.locator("#others")).not.toContainText(".rpm");
    await expect(page.getByText("Version 0.3.0")).toBeVisible();
  });
}

test("first launch commands are shown", async ({ page }) => {
  await page.goto("/download/");
  await expect(page.getByText("xattr -dr com.apple.quarantine /Applications/Shellvia.app")).toBeVisible();
  await expect(page.getByText("chmod +x Shellvia_*.AppImage")).toBeVisible();
  await expect(page.getByText(/not yet signed/)).toBeVisible();
});

test("keeps build-time links when the API fails", async ({ page }) => {
  let calls = 0;
  await page.route(LATEST_API, (r) => {
    calls += 1;
    return r.fulfill({ status: 403 });
  });
  const requested = page.waitForRequest(LATEST_API);
  await page.goto("/download/");
  await requested;
  await page.waitForLoadState("networkidle");
  expect(calls).toBeGreaterThan(0);
  await expect(page.getByRole("main").getByRole("link", { name: "Download", exact: true })).toHaveAttribute(
    "href",
    /Shellvia_0\.3\.0_x64-setup\.exe$/,
  );
  await expect(page.locator("#others a[title]").first()).toHaveAttribute(
    "href",
    /Shellvia_0\.3\.0_x64-setup\.exe$/,
  );
});

test("refreshes to a newer release", async ({ page }) => {
  await page.route(LATEST_API, (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(newerRelease()) }),
  );
  await page.goto("/download/");
  await expect(page.getByText("Version 0.4.0")).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Download", exact: true })).toHaveAttribute(
    "href",
    /0\.4\.0_x64-setup\.exe$/,
  );
});

test.describe("macOS Safari visitor", () => {
  test.use({ userAgent: MAC_SAFARI_UA });

  test("is detected and offered the dmg", async ({ page }) => {
    await page.goto("/download/");
    await expect(page.getByText("Your system: macOS")).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "Download", exact: true }),
    ).toHaveAttribute("href", /\.dmg$/);
  });
});

test.describe("works without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("download page links go to GitHub", async ({ page }) => {
    await page.goto("/download/");
    const hrefs = await page
      .locator("main a")
      .evaluateAll((els) =>
        els.map((e) => e.getAttribute("href") ?? "").filter((h) => /\.(exe|msi|dmg|AppImage|deb)$/.test(h)),
      );
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    for (const href of hrefs) expect(href).toMatch(/^https:\/\/github\.com\//);
  });

  test("home download links go to GitHub and demos show their end state", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("#download a")
      .evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
    expect(hrefs.length).toBe(3);
    for (const href of hrefs) expect(href).toMatch(/^https:\/\/github\.com\//);
    await expect(page.locator("[data-play]")).toHaveCount(0);
  });
});
