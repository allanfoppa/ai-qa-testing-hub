const path = require("path");
const projectRoot = path.resolve(__dirname, "../../../");

const suiteName = process.env.SUITE_NAME || "all-suites";
const suiteVersion = process.env.SUITE_VERSION || "latest";

module.exports = {
  testEnvironment: "node",

  rootDir: path.resolve(process.cwd()),

  extensionsToTreatAsEsm: [".ts"],

  testMatch: [`<rootDir>/**/${process.env.SUITE_PATH || "*"}.spec.{ts,js}`],

  testPathIgnorePatterns: [
    "/node_modules/",
    "src/suites/rick-and-morty-graphs-and-stuff/",
  ],

  moduleNameMapper: {
    "^@config/(.*)$": path.join(projectRoot, "config/$1"),
  },

  collectCoverage: true,

  coverageDirectory: path.resolve(
    projectRoot,
    "src/engines/jest/coverage",
    suiteName,
    suiteVersion,
  ),

  moduleFileExtensions: ["js", "ts", "json", "node"],

  transform: {
    "^.+\\.(t|j)s$": [
      path.join(projectRoot, "node_modules", "ts-jest"),
      {
        useESM: true,
      },
    ],
  },
};
