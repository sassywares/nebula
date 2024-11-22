/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(test).tsx", "**/?(*.)+(test).ts"],
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  coverageDirectory: "<rootDir>/jest/coverage",
  setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/cypress/", "/.next/"],
};

export default createJestConfig(config);
