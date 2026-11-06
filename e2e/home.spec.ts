import { expect, test } from "./fixtures";

test("the hero button points at the Windows installer by default", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("main section").first().getByRole("link", { name: /Download for/ });
  await expect(hero).toHaveAttribute("href", /x64-setup\.exe$/);
});

test("the three system cards link to exe, dmg and AppImage", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#download");
  await expect(cards.getByRole("link", { name: "Download for Windows" })).toHaveAttribute(
    "href",
    /\.exe$/,
  );
  await expect(cards.getByRole("link", { name: "Download for macOS" })).toHaveAttribute(
    "href",
    /\.dmg$/,
  );
  await expect(cards.getByRole("link", { name: "Download for Linux" })).toHaveAttribute(
    "href",
    /\.AppImage$/,
  );
  await expect(cards).not.toContainText(".rpm");
});

test("the French home shows the hero and the download section", async ({ page }) => {
  await page.goto("/fr/");
  await expect(page.getByText("Tous vos serveurs.")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Gratuit\. Sans compte\./ })).toBeVisible();
});

test("the FAQ has five entries and opens on click", async ({ page }) => {
  await page.goto("/");
  const entries = page.locator("#faq details");
  await expect(entries).toHaveCount(5);
  const first = entries.first();
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
});

test("the FAQ nav link scrolls to #faq", async ({ page }) => {
  await page.goto("/");
  await page.locator("nav").getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL(/#faq$/);
  await expect(page.locator("#faq")).toBeInViewport();
});
