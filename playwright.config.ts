import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: { baseURL: "http://localhost:4321" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm build && pnpm exec serve out -l 4321",
    url: "http://localhost:4321",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
