import a from 'assertron';
import { InvalidEnvVar } from '../errors';
import { getMode } from './getMode';

test('invalid value throws', () => {
  a.throws(() => getMode({ STANDARD_LOG: 'unknown' }), InvalidEnvVar)
})
