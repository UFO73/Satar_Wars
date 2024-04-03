module.exports = {
  testMatch: ["**/*.test.js"],
  collectCoverage: false,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ["**/*.js"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"]
};