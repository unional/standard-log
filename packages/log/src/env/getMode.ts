import { InvalidEnvVar } from '../errors';
import { RuntimeMode } from '../types';

export function getMode(env: any): RuntimeMode {
  const mode = env.STANDARD_LOG
  if (mode && (mode !== 'prod' && mode !== 'devel')) throw new InvalidEnvVar('STANDARD_LOG', mode, ['prod', 'devel'])
  return mode || 'prod'
}
