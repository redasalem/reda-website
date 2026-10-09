const nextJest = require("next/jest");
module.exports = nextJest({ dir: "./" })({
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/rules/**/*.test.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  testTimeout: 20000,
  maxWorkers: 1,
});
