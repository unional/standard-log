import { getMode } from './getMode';
import a from 'assertron'
import { InvalidEnvVar } from '../errors';

test('invalid value throws', () => {
  a.throws(() => getMode({ STANDARD_LOG: 'unknown' }), InvalidEnvVar)
})
