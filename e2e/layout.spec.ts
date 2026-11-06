import { expect, test } from "./fixtures";

const ALL_PATHS = [
  "/",
  "/fr/",
  "/download/",
  "/fr/telecharger/",
  "/legal/",
  "/fr/mentions-legales/",
  "/privacy/",
  "/fr/confidentialite/",
];

for (const path of ALL_PATHS) {
  test(`${path} main title fits at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(path);
    const m = await page.locator("main h1").evaluate((el) => ({
      scroll: el.scrollWidth,
      client: el.clientWidth,
      right: el.getBoundingClientRect().right,
    }));
    expect(m.scroll).toBeLessThanOrEqual(m.client);
    expect(m.right).toBeLessThanOrEqual(360);
  });

  for (const width of [360, 1280, 1920]) {
    test(`${path} has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const w = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(w).toBeLessThanOrEqual(width);
    });
  }
}

const TITLES = [
  { path: "/legal/", h1: "Legal notice" },
  { path: "/privacy/", h1: "Privacy" },
  { path: "/fr/mentions-legales/", h1: "Mentions légales" },
  { path: "/fr/confidentialite/", h1: "Confidentialité" },
];

for (const { path, h1 } of TITLES) {
  test(`${path} shows its title and content`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main h1")).toHaveText(h1);
    await expect(page.locator("main h2").first()).toBeVisible();
  });
}
