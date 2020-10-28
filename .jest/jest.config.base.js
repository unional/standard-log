module.exports = {
  moduleNameMapper: {
    '^standard-log': '<rootDir>/../log/src',
    '^standard-log-(.*)': '<rootDir>/../$1/src',
  },
  roots: [
    '<rootDir>/src'
  ],
}
