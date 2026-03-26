import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: [
    "<rootDir>/src/suites/**/*.spec.ts",
    "<rootDir>/src/suites/**/*.test.ts",
    "<rootDir>/src/suites/**/*.spec.js",
    "<rootDir>/src/suites/**/*.test.js",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/suites/rick-and-morty-graphs-and-stuff/**/*.spec.ts",
  ],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "^.+\\.js$": "babel-jest",
  },
};

export default config;
