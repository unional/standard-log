const base = require('@unional/devpkg-node/simple/config/jest.common')

module.exports = Object.assign(base, {
  projects: [
    'packages/*'
  ]
})
