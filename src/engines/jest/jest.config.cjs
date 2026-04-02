const path = require("path");
const projectRoot = path.resolve(__dirname, "../../../");

module.exports = {
  testEnvironment: "node",

  rootDir: path.resolve(process.cwd()),

  testMatch: [`<rootDir>/**/${process.env.SUITE_PATH || "*"}.spec.{ts,js}`],

  testPathIgnorePatterns: [
    "/node_modules/",
    "src/suites/rick-and-morty-graphs-and-stuff/",
  ],

  moduleNameMapper: {
    "^@config/(.*)$": path.join(projectRoot, "config/$1"),
  },

  collectCoverage: false, // Here we test a black-box QA/testing hub, and Jest coverage is a white-box tool.

  modulePaths: [projectRoot],

  moduleFileExtensions: ["js", "ts", "json", "node"],
};
