import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const baseConfig: Config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

const jsdomConfig = createJestConfig({
  ...baseConfig,
  displayName: "jsdom",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/src/app/api/"],
});

const nodeConfig = createJestConfig({
  ...baseConfig,
  displayName: "node",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/app/api/**/*.test.[jt]s"],
});

const config = async () => ({
  projects: [await jsdomConfig(), await nodeConfig()],
});

export default config;
