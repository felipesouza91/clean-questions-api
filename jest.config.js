module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/protocols/**'
  ],
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node'
}
