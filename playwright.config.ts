import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: "http://localhost:4321" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Pinned (after the spread, which sets its own) so OS detection and
        // the e2e text do not depend on the host.
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    },
  ],
  webServer: {
    command: "pnpm build && pnpm exec serve out -l 4321",
    url: "http://localhost:4321",
    reuseExistingServer: false,
    timeout: 180_000,
    env: { SHELLVIA_RELEASES_FIXTURE: "src/lib/fixtures/release.json" },
  },
});
