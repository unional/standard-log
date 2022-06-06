import watch from './jest.watch.mjs'

export default {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  moduleNameMapper: {
    // remove the phantom `.js` extension
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // If dependency doing `import ... from '#<pkg>'.
    // e.g. `chalk` has this: `import ... form '#ansi-styles'`
    '#(.*)': '<rootDir>/node_modules/$1',
    '^standard-log': '<rootDir>/../log/ts',
    '^standard-log-(.*)': '<rootDir>/../$1/src',
  },
  // transformIgnorePatterns: [
  //   // Need to MANUALLY identify each ESM package, one by one
  //   'node_modules/(?!(@unional\\fixture|chalk)/)'
  // ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest'
  },
  roots: [
    '<rootDir>/ts',
  ],
  ...watch
}
