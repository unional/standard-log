module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
      tsConfig: {
        module: 'ESNext',
        target: 'ES2017',
      }
    }
  },
  moduleNameMapper: {
    '^standard-log': '<rootDir>/../log/src',
    '^standard-log-(.*)': '<rootDir>/../$1/src',
  },
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src'
  ],
}
