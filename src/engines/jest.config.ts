export default {
  // Use the env var we set in Step 5 of the YAML
  rootDir: `../../apps/${process.env.PROJECT_ID_ENV}/${process.env.PROJECT_ROOT_PATH || ""}`,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // Ensure we can resolve modules from the cloned app's folder
  moduleDirectories: ["node_modules", `<rootDir>/node_modules`],

  preset: "ts-jest",
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.spec.ts"],
};
