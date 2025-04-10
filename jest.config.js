// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest', // Use the ts-jest preset for TypeScript files
    testEnvironment: 'node', // Specify the testing environment as Node.js
    testMatch: ['**/__tests__/**/*.test.ts'], // Look for test files in __tests__ directories ending with .test.ts
    verbose: true, // Output detailed information during tests
  };