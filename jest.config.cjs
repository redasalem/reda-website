const nextJest = require("next/jest");
module.exports = nextJest({ dir: "./" })({
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testMatch: ["<rootDir>/tests/unit/**/*.test.ts", "<rootDir>/tests/unit/**/*.test.tsx"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1", "^server-only$": "<rootDir>/tests/server-only.cjs" },
  clearMocks: true,
});
