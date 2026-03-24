import { defineConfig } from "@playwright/test";

const targetApp = process.env.PROJECT_ID_ENV;

export default defineConfig({
  webServer: {
    command: `cd apps/${targetApp} && pnpm run dev`,
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // CI can be slow to start Vite
  },

  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
});
