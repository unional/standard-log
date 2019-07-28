import a from 'assertron';
import { InvalidEnvVar } from '../errors';
import { getMode } from './getMode';

test('invalid value throws', () => {
  a.throws(() => getMode({ STANDARD_LOG: 'unknown' }), InvalidEnvVar)
})

test('valid values', () => {
  expect(getMode({ STANDARD_LOG: 'prod' })).toBe('prod')
  expect(getMode({ STANDARD_LOG: 'devel' })).toBe('devel')
})
