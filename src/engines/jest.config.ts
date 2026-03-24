import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Tell Jest where to find the tests dynamically
  testMatch: ["**/suites/**/*.spec.ts", "**/suites/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    // This allows Jest to resolve your absolute imports if you use them
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
