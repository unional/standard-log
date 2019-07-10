const base = require('@unional/devpkg-node/simple/config/jest.common')

module.exports = Object.assign(base, {
  // moduleNameMapper: {
  //   'standard-log-(.+)$': '<rootDir>packages/$1/src'
  // },
  projects: [
    'packages/*'
  ]
})
