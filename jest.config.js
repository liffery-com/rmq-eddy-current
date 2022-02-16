module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx'
  ],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageDirectory: 'coverage',

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/__tests__/*.spec.ts',
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testURL: 'http://localhost/',
}
