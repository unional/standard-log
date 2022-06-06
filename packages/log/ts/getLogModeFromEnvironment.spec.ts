import a from 'assertron'
import { InvalidEnvVar } from './index.js'
import { getLogModeFromEnvironment } from './getLogModeFromEnvironment.js'

test('invalid value throws', () => {
  process.env.STANDARD_LOG = 'unknown'
  a.throws(() => getLogModeFromEnvironment(), InvalidEnvVar)
})

test('valid values', () => {
  process.env.STANDARD_LOG = 'production'
  expect(getLogModeFromEnvironment()).toBe('production')

  process.env.STANDARD_LOG = 'development'
  expect(getLogModeFromEnvironment()).toBe('development')
})
