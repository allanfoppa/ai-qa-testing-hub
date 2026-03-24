import type { Config } from "jest";
import path from "path";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: path.resolve(__dirname, "../../"),
  testMatch: [
    "<rootDir>/src/suites/**/*.spec.ts",
    "<rootDir>/src/suites/**/*.test.ts",
  ],
  moduleNameMapper: {
    "^@config/(.*)$": "<rootDir>/config/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
