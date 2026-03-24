import { defineConfig } from "@playwright/test";

// Get the folder name from the environment variable we set in the YAML
const targetAppFolder = process.env.PROJECT_ID_ENV;

export default defineConfig({
  webServer: {
    command: `cd apps/${targetAppFolder} && pnpm run dev`,
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
