import { defineConfig } from "@playwright/test";
import path from "path";

// 1. Get the absolute path to the project root
// Since this file is in src/engines/, the root is two levels up
const projectRoot = path.resolve(__dirname, "../../");

const targetId = process.env.PROJECT_ID_ENV || "";
const rootPath = process.env.PROJECT_ROOT_PATH || ""; // 'app', 'frontend', or ''
const targetPort = process.env.PROJECT_PORT_ENV || "3000";
const startCommand = process.env.PROJECT_INIT_ENV || "pnpm run start";

// 2. Build the absolute path to the cloned app
const appDir = path.join(projectRoot, "apps", targetId, rootPath);

export default defineConfig({
  webServer: {
    command: `cd ${appDir} && ${startCommand}`,
    url: `http://localhost:${targetPort}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  use: {
    baseURL: `http://localhost:${targetPort}`,
  },
});
