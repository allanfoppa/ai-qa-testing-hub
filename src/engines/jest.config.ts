import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: [
    "<rootDir>/src/suites/**/integration/*.spec.js",
    "<rootDir>/src/suites/**/e2e/*.spec.js",
    "<rootDir>/src/suites/**/**/integration/*.spec.js",
    "<rootDir>/src/suites/**/**/e2e/*.spec.js",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "src/suites/rick-and-morty-graphs-and-stuff/",
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
