import a from 'assertron'
import { InvalidEnvVar } from '../index.js'
import { assertSSF } from '../testUtil.js'
import { getLogModeFromEnvironment } from './index.js'

test('invalid value throws', () => {
  process.env.STANDARD_LOG = 'unknown'
  a.throws(() => getLogModeFromEnvironment(), InvalidEnvVar)
})

it('throws with ssf at call site', () => {
  process.env.STANDARD_LOG = 'unknown'
  const err = a.throws(() => getLogModeFromEnvironment(), InvalidEnvVar)
  assertSSF(err, __filename)
})

test('valid values', () => {
  process.env.STANDARD_LOG = 'production'
  expect(getLogModeFromEnvironment()).toBe('production')

  process.env.STANDARD_LOG = 'development'
  expect(getLogModeFromEnvironment()).toBe('development')
})
