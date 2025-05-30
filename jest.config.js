/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^src$": "<rootDir>/src/index.ts",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
