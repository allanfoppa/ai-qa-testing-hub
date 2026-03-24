import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: [
    "<rootDir>/src/suites/**/*.spec.ts",
    "<rootDir>/src/suites/**/*.test.ts",
  ],
  moduleNameMapper: {
    "^@config/(.*)$": "<rootDir>/config/$1",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default config;
