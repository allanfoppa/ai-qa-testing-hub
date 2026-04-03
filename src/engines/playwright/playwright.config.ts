import { defineConfig, devices } from "@playwright/test";
import path from "path";

// Dynamically identify the suite name and version for reporting
const suiteName = process.env.SUITE_NAME || "all-suites";
const suiteVersion = process.env.SUITE_VERSION || "latest";

export default defineConfig({
  // Use the folder where the command is executed as the base
  testDir: path.resolve(process.cwd()),

  testMatch: ["**/behavior/**/*.spec.ts"],

  outputDir: path.resolve(
    __dirname,
    `test-results/${suiteVersion}/${suiteName}`,
  ),

  reporter: [
    [
      "html",
      {
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
