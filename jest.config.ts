export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 100,
      lines: 100,
      functions: 100,
      statements: 100,
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  reporters: ['html', 'text'],
  testMatch: ['**/*.test.ts'],
};
