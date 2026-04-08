import { mkdirSync, existsSync, writeFileSync } from "fs";
import { join } from "path";
import prompts from "prompts";

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
    correctness: (name: string) => `
import { describe, it, expect } from "@jest/globals";

/**
 * CORRECTNESS TESTS
 *
 * Purpose:
 * Validate that the system produces correct and meaningful results.
 *
 * Correctness means:
 * - The request is not empty
 *
 * These tests focus on OUTPUT QUALITY, not structure.
 */

describe("${capitalize(name)} - Correctness", () => {
  it("placeholder: data request is returning meaningful results", () => {
    // TODO:
    // - Call backend API
    // - Assert response is meaningful

    expect(true).toBe(true);
  });
});
`,

    contracts: (name: string) => `
import { describe, it, expect } from "@jest/globals";

/**
 * CONTRACT TESTS
 *
 * Purpose:
 * Ensure the API contract remains stable between systems.
 *
 * These tests validate:
 * - Response structure
 * - Field names and types
 * - Error formats
 *
 * These tests DO NOT validate business logic or correctness.
 */

describe("${capitalize(name)} - Contracts", () => {
  it("placeholder: should validate API response shape", () => {
    // TODO:
    // - Call API
    // - Assert response matches expected schema
    // - Validate required fields

    expect(true).toBe(true);
  });

  it("placeholder: should validate error response format", () => {
    // TODO:
    // - Send invalid input
    // - Assert error structure

    expect(true).toBe(true);
  });
});
`,

    behavior: (name: string) => `
import { test, expect } from "@playwright/test";

/**
 * BEHAVIOR TESTS
 *
 * Purpose:
 * Validate real user flows across the system.
 *
 * These tests simulate user interactions and verify:
 * - UI updates correctly
 * - Backend integration works
 * - End-to-end flow is functional
 *
 * These tests DO NOT check internal implementation details.
 */

test.describe("${capitalize(name)} - Behavior", () => {
  test("placeholder: user flow works", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/.*/);
  });
});
`,
  };

  type TemplatePillar = keyof typeof templates;

  types.forEach((type: string) => {
    const suiteBasePath = join(root, "src/suites", suiteName, type);

    const pillars: TemplatePillar[] = ["correctness", "contracts"];

    if (type === "frontend") {
      pillars.push("behavior");
    }

    // Create base directory
    mkdirSync(suiteBasePath, { recursive: true });

    // Create pillar folders + test files
    pillars.forEach((pillar) => {
      const dir = join(suiteBasePath, pillar);
      mkdirSync(dir, { recursive: true });

      const filePath = join(dir, `example.${pillar}.spec.ts`);

      if (!existsSync(filePath)) {
        writeFileSync(filePath, templates[pillar](suiteName));
        console.log(`✅ Created: ${filePath}`);
      } else {
        console.log(`⚠️ Skipped (exists): ${filePath}`);
      }
    });

    // Create package.json
    const packageJsonPath = join(suiteBasePath, "package.json");

    if (!existsSync(packageJsonPath)) {
      const pkg = createPackageJson(suiteName, type);

      writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

      console.log(`✅ Created: ${packageJsonPath}`);
    } else {
      console.log(`⚠️ Skipped (exists): ${packageJsonPath}`);
    }
  });

  console.log("\n🚀 Suite generated successfully!");
})();

function createPackageJson(suiteName: string, type: string): object {
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
      "test:all": `pnpm run test:correctness && pnpm run test:contracts${type === "frontend" ? " && pnpm run test:behavior" : ""
        }`,

      "test:correctness":
        "cross-env NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version jest --config $npm_package_config_jestConfigFile --testPathPatterns=correctness",

      "test:contracts":
        "cross-env NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version jest --config $npm_package_config_jestConfigFile --testPathPatterns=contracts",

      ...(type === "frontend" && {
        "test:behavior":
          "cross-env NODE_OPTIONS='--experimental-vm-modules' SUITE_NAME=$npm_package_config_suite_name SUITE_VERSION=$npm_package_version playwright test --config $npm_package_config_playwrightConfigFile",
      }),
    },
  };
}

function capitalize(str: string): string {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized.replace(/[-_]/g, " ");
}
