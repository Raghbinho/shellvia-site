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
