import { expect, test } from "./fixtures";

const PATHS = [
  "/",
  "/download/",
  "/legal/",
  "/privacy/",
  "/fr/",
  "/fr/telecharger/",
  "/fr/mentions-legales/",
  "/fr/confidentialite/",
];

test("sitemap lists the 8 absolute URLs", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  for (const path of PATHS) {
    expect(body).toContain(`<loc>https://shellvia.com${path}</loc>`);
  }
  expect(body.match(/<loc>/g)).toHaveLength(8);
});

test("robots.txt names the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("Sitemap: https://shellvia.com/sitemap.xml");
});

for (const path of PATHS) {
  test(`${path} has one h1 and a description`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length ?? 0).toBeGreaterThan(0);
  });
}

for (const path of PATHS) {
  test(`${path} links the favicon`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('link[rel="icon"][href="/assets/shellvia-icon.svg"]')).toHaveCount(1);
  });
}
