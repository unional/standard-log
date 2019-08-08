import a from 'assertron';
import { InvalidEnvVar } from '.';
import { getLogModeFromEnvironment } from './getLogModeFromEnvironment';

test('invalid value throws', () => {
  process.env.STANDARD_LOG = 'unknown'
  a.throws(() => getLogModeFromEnvironment(), InvalidEnvVar)
})

test('valid values', () => {
  process.env.STANDARD_LOG = 'prod'
  expect(getLogModeFromEnvironment()).toBe('prod')

  process.env.STANDARD_LOG = 'devel'
  expect(getLogModeFromEnvironment()).toBe('devel')
})
