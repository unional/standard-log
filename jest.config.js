module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[jt]s',
    '!<rootDir>/src/bin.[jt]s',
    '!<rootDir>/src/**/*.browser.[jt]s'
  ],
  projects: [
    '<rootDir>/packages/*/jest.config.js'
  ],
  reporters: [
    'default',
    'jest-progress-tracker',
    ['jest-audio-reporter', { volume: 0.3 }],
  ],
  watchPlugins: [
    'jest-watch-suspend',
    'jest-watch-repeat',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config', { 'setting': 'verbose' }
    ],
    [
      'jest-watch-toggle-config', { 'setting': 'collectCoverage' }
    ]
  ]
}
