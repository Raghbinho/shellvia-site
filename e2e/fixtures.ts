import { readFileSync } from "node:fs";
import { test as base, expect } from "@playwright/test";

const LATEST_API =
  "https://api.github.com/repos/Raghbinho/shellvia-releases/releases/latest";
const RELEASE_BODY = readFileSync("src/lib/fixtures/release.json", "utf8");

/** `test` whose page never reaches the real GitHub API: it answers with the fixture. */
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route(LATEST_API, (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: RELEASE_BODY }),
    );
    await provide(page);
  },
});

export { expect };
