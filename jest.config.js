module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/config/env.ts',
    '!<rootDir>/src/main/server.ts'
  ],
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node'
}
