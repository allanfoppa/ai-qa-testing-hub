import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

// Dynamically identify the suite name and version for reporting
const suiteName = process.env.SUITE_NAME || "all-suites";
const suiteVersion = process.env.SUITE_VERSION || "latest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../../");

export default defineConfig({
  // Use the folder where the command is executed as the base
  testDir: path.resolve(process.cwd()),

  testMatch: ["**/behavior/**/*.spec.ts"],

  outputDir: path.resolve(
    PROJECT_ROOT,
    `reports/playwright/test-results/${suiteVersion}/${suiteName}`,
  ),

  reporter: [
    [
      "html",
      {
        outputFolder: path.resolve(
          PROJECT_ROOT,
          `reports/playwright/playwright-report/${suiteVersion}/${suiteName}`,
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
