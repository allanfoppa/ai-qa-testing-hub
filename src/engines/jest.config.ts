import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: [
    "<rootDir>/src/suites/**/*.spec.ts",
    "<rootDir>/suites/**/*.spec.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/suites/rick-and-morty-graphs-and-stuff/",
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
