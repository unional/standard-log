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
    '^standard-log': '<rootDir>/../log',
    '^standard-log-(.*)': '<rootDir>/../$1',
  },
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src'
  ],
}
