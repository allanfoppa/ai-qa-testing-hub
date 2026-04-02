import { defineConfig, devices } from "@playwright/test";
import path from "path";

// Get the suite name from an environment variable, or default to 'all'
const suiteName = process.env.SUITE_NAME || "all-suites";
const suiteVersion = process.env.SUITE_VERSION || "latest";

export default defineConfig({
  // Use the folder where the command is executed as the base
  testDir: path.resolve(process.cwd()),

  testMatch: /.*(\.e2e|\.integration)\.spec\.(js|ts)/,

  outputDir: path.resolve(
    __dirname,
    `test-results/${suiteVersion}/${suiteName}`,
  ),

  reporter: [
    [
      "html",
      {
        // The final dashboard also gets its own sub-folder
        outputFolder: path.resolve(
          __dirname,
          `playwright-report/${suiteVersion}/${suiteName}`,
        ),
        open: "never",
      },
    ],
  ],

  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
