import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^src$": "<rootDir>/src/index.ts",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
