const path = require('path')
const watch = require('./jest.watch.cjs')

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    // remove the phantom `.js` extension
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // If dependency doing `import ... from '#<pkg>'.
    // e.g. `chalk` has this: `import ... form '#ansi-styles'`
    chalk: require.resolve('chalk'),
    '#ansi-styles': path.join(
      require.resolve('chalk').split('chalk')[0],
      'chalk/source/vendor/ansi-styles/index.js',
    ),
    '#supports-color': path.join(
      require.resolve('chalk').split('chalk')[0],
      'chalk/source/vendor/supports-color/index.js',
    ),
    '^standard-log': '<rootDir>/../log/ts',
    '^standard-log-(.*)': '<rootDir>/../$1/src',
  },
  transform: {
    '^.+\\.m?[tj]sx?$': ['ts-jest', { isolatedModules: true, useESM: true }],
  },
  // transformIgnorePatterns: [
  //   // Need to MANUALLY identify each ESM package, one by one
  //   'node_modules/(?!(@unional\\fixture|chalk)/)'
  //   'node_modules/.*\\.(ts|tsx|mts|cts)$'
  // ],
  // transform: {
  //   '^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
  //   '^.+\\.(ts|tsx|mts|cts)$': ['ts-jest', {
  //     isolatedModules: true,
  //     useESM: true
  //   }]
  // },
  roots: [
    '<rootDir>/ts',
  ],
  ...watch
}
