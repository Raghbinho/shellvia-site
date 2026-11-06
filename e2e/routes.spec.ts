import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", lang: "en" },
  { path: "/download/", lang: "en" },
  { path: "/legal/", lang: "en" },
  { path: "/privacy/", lang: "en" },
  { path: "/fr/", lang: "fr" },
  { path: "/fr/telecharger/", lang: "fr" },
  { path: "/fr/mentions-legales/", lang: "fr" },
  { path: "/fr/confidentialite/", lang: "fr" },
] as const;

for (const { path, lang } of PAGES) {
  test(`${path} is served with its language and alternates`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("main h1")).toHaveCount(1);
    for (const hreflang of ["en", "fr", "x-default"]) {
      const href = await page
        .locator(`link[rel="alternate"][hreflang="${hreflang}"]`)
        .getAttribute("href");
      expect(href).toMatch(/^https:\/\/shellvia\.com\//);
    }
  });
}

test("language switch leads to the matching page", async ({ page }) => {
  await page.goto("/download/");
  await page.locator("nav a[hreflang='fr']").click();
  await expect(page).toHaveURL(/\/fr\/telecharger\/$/);
});

test("unknown path serves the bilingual 404", async ({ page }) => {
  await page.goto("/does-not-exist/");
  await expect(page.getByText("Page not found")).toBeVisible();
  await expect(page.getByText("Page introuvable")).toBeVisible();
});
