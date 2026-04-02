import { defineConfig, devices } from "@playwright/test";
import path from "path";

export default defineConfig({
  // Use the folder where the command is executed as the base
  testDir: path.resolve(process.cwd()),

  testMatch: /.*(\.e2e|\.integration)\.spec\.(js|ts)/,

  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
