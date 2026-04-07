#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "suiteName",
      message: "Enter suite name:",
      validate: (value) => (value ? true : "Suite name is required"),
    },
    {
      type: "multiselect",
      name: "types",
      message: "Select suite types:",
      choices: [
        { title: "frontend", value: "frontend" },
        { title: "backend", value: "backend" },
      ],
      min: 1,
    },
  ]);

  const { suiteName, types } = response;

  if (!suiteName || !types || types.length === 0) {
    console.log("❌ Operation cancelled");
    process.exit(1);
  }

  const root = process.cwd();

  const templates = {
    correctness: (name) => `
/**
 * CORRECTNESS TESTS
 * Validate output quality and logic
 */

describe("${capitalize(name)} - Correctness", () => {
  it("placeholder: should validate correctness", () => {
    expect(true).toBe(true);
  });
});
`,

    contracts: (name) => `
/**
 * CONTRACT TESTS
 * Validate API structure and schema
 */

describe("${capitalize(name)} - Contracts", () => {
  it("placeholder: should validate contract", () => {
    expect(true).toBe(true);
  });
});
`,

    behavior: (name) => `
import { test, expect } from "@playwright/test";

/**
 * BEHAVIOR TESTS
 * Validate real user flows
 */

test.describe("${capitalize(name)} - Behavior", () => {
  test("placeholder: user flow works", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/.*/);
  });
});
`,
  };

  types.forEach((type) => {
    const suiteBasePath = path.join(root, "src/suites", suiteName, type);

    const pillars = ["correctness", "contracts"];

    if (type === "frontend") {
      pillars.push("behavior");
    }

    // Create base directory
    fs.mkdirSync(suiteBasePath, { recursive: true });

    // Create pillar folders + test files
    pillars.forEach((pillar) => {
      const dir = path.join(suiteBasePath, pillar);
      fs.mkdirSync(dir, { recursive: true });

      const filePath = path.join(dir, `example.${pillar}.spec.ts`);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, templates[pillar](suiteName));
        console.log(`✅ Created: ${filePath}`);
      } else {
        console.log(`⚠️ Skipped (exists): ${filePath}`);
      }
    });

    // Create package.json
    const packageJsonPath = path.join(suiteBasePath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      const pkg = createPackageJson(suiteName, type);

      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

      console.log(`✅ Created: ${packageJsonPath}`);
    } else {
      console.log(`⚠️ Skipped (exists): ${packageJsonPath}`);
    }
  });

  console.log("\n🚀 Suite generated successfully!");
})();

function createPackageJson(suiteName, type) {
  return {
    name: `@hub/${suiteName}-${type}`,
    version: "1.0.0",
    type: "module",
    config: {
      jestConfigFile: "../../../engines/jest/jest.config.cjs",
      playwrightConfigFile: "../../../engines/playwright/playwright.config.ts",
      suite_name: `${suiteName}-${type}`,
    },
    scripts: {
      test: `pnpm run test:correctness && pnpm run test:contracts${
        type === "frontend" ? " && pnpm run test:behavior" : ""
      }`,

      "test:correctness":
        "NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version jest --config $npm_package_config_jestConfigFile --testPathPatterns=correctness",

      "test:contracts":
        "NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version jest --config $npm_package_config_jestConfigFile --testPathPatterns=contracts",

      ...(type === "frontend" && {
        "test:behavior":
          "NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version playwright test --config $npm_package_config_playwrightConfigFile",
      }),
    },
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
