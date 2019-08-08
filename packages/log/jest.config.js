const base = require('@unional/devpkg-node/simple/config/jest.common')
module.exports = Object.assign(base, {
  displayName: 'log',
  rootDir: '.',
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.[jt]s',
    '!<rootDir>/src/bin.[jt]s',
    '!<rootDir>/src/**/*.browser.[jt]s'
  ]
})
