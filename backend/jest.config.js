/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",  // Use Node environment
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],  // Use ts-jest for transforming TypeScript files
  },
  testPathIgnorePatterns: ["/node_modules/"],  // Ignore node_modules during testing
  moduleNameMapper: {
    // Example for path aliases (adjust as needed for your project)
    "^@models/(.*)$": "<rootDir>/src/models/$1",  // Example of mapping aliases
  },
  collectCoverage: true,  // Collect code coverage for your tests
  coverageDirectory: "coverage",  // Directory where coverage report will be saved
  coverageProvider: "v8",  // Use V8 for coverage collection
};
