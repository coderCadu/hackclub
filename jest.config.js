const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 30000,
  maxWorkers: 4,
  cache: true,
});

module.exports = jestConfig;
