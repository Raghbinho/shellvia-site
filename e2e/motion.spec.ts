import { expect, test } from "@playwright/test";

test("the typed command is animating by default", async ({ page }) => {
  await page.goto("/");
  const running = await page
    .getByTestId("aw-typed")
    .evaluate((el) => el.getAnimations().length);
  expect(running).toBeGreaterThan(0);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("no animation and the end state is shown", async ({ page }) => {
    await page.goto("/");
    const animated = await page.evaluate(() =>
      Array.from(document.querySelectorAll("main, main *")).filter(
        (el) => getComputedStyle(el).animationName !== "none",
      ).length,
    );
    expect(animated).toBe(0);
    await expect(page.getByTestId("aw-after")).toHaveCSS("opacity", "1");
    await expect(page.getByTestId("aw-typed")).toHaveCSS("width", /[1-9]/);
  });
});

test.describe("feature grid", () => {
  test("demos start only when the grid is scrolled into view", async ({ page }) => {
    await page.goto("/");
    const grid = page.getByTestId("feature-grid");
    const demo = page.getByTestId("demo-multi-typed").first();
    await expect(grid).not.toHaveAttribute("data-play", "true");
    expect(await demo.evaluate((el) => el.getAnimations().length)).toBe(0);
    await page.locator("#features").scrollIntoViewIfNeeded();
    await grid.scrollIntoViewIfNeeded();
    await expect(grid).toHaveAttribute("data-play", "true");
    expect(await demo.evaluate((el) => el.getAnimations().length)).toBeGreaterThan(0);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no demo animates and the end state is visible", async ({ page }) => {
      await page.goto("/");
      const grid = page.getByTestId("feature-grid");
      await grid.scrollIntoViewIfNeeded();
      await expect(grid).toHaveAttribute("data-play", "true");
      const animated = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#features, #features *")).filter(
          (el) => getComputedStyle(el).animationName !== "none",
        ).length,
      );
      expect(animated).toBe(0);
      await expect(page.getByText("Done.").first()).toHaveCSS("opacity", "1");
      await expect(page.getByTestId("demo-multi-typed").first()).toHaveCSS("width", /[1-9]/);
    });
  });
});
