import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", channel: "chrome" },
  webServer: { command: "npm run start -- --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI },
  projects: [{ name: "desktop", use: { channel: "chrome", viewport: { width: 1440, height: 900 } } }],
});
