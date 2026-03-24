import { defineConfig } from "@playwright/test";
import path from "path";

// 1. Get the absolute path to the project root
// Since this file is in src/engines/, the root is two levels up
const projectRoot = path.resolve(__dirname, "../../");

const targetApp = process.env.PROJECT_ID_ENV || "";
const targetPort = process.env.PROJECT_PORT_ENV;

// 2. Build the absolute path to the cloned app
const appDir = path.join(projectRoot, "apps", targetApp);

export default defineConfig({
  webServer: {
    command: `cd ${appDir} && pnpm run dev`,
    url: `http://localhost:${targetPort}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  use: {
    baseURL: `http://localhost:${targetPort}`,
  },
});
