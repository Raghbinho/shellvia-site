import { expect, test } from "./fixtures";

for (const path of ["/", "/fr/", "/download/", "/fr/telecharger/"]) {
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
