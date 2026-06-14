import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:6173";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm.cmd run dev -- --host 127.0.0.1 --port 6173 --strictPort",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
