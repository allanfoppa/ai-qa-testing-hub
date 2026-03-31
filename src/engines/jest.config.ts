import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: ["<rootDir>/src/suites/**/*.spec.{ts,js}"],
  moduleFileExtensions: ["js", "ts", "json", "node"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "src/suites/rick-and-morty-graphs-and-stuff/",
  ],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
    "^.+\\.js$": "babel-jest",
  },
};

export default config;
