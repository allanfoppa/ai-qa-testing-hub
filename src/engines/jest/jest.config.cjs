const path = require("path");
const projectRoot = path.resolve(__dirname, "../../../");

module.exports = {
  testEnvironment: "node",

  rootDir: path.resolve(process.cwd()),

  testMatch: [`<rootDir>/**/${process.env.SUITE_PATH || "*"}.spec.{ts,js}`],

  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/", "/coverage/"],

  moduleNameMapper: {
    "^@config/(.*)$": path.join(projectRoot, "config/$1"),
  },

  collectCoverage: false,

  modulePaths: [projectRoot],

  moduleFileExtensions: ["js", "ts", "json", "node"],

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
