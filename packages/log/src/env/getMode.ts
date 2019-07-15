import { LogMode } from 'standard-log-core';
import { InvalidEnvVar } from '../errors';

export function getMode(env: any): LogMode {
  const mode = env.STANDARD_LOG
  if (mode && ['prod', 'devel', 'test'].indexOf(mode) === -1)
    throw new InvalidEnvVar('STANDARD_LOG', mode, ['prod', 'devel', 'test'])
  return mode || 'prod'
}
