import { InvalidEnvVar } from './errors';
import { LogMode } from './types';

export function getLogModeFromEnvironment(): LogMode | undefined {
  const mode = process.env.STANDARD_LOG
  if (mode === undefined) return mode
  if (!isLogMode(mode)) throw new InvalidEnvVar('STANDARD_LOG', mode, ['prod', 'devel', 'test'])
  return mode
}

function isLogMode(mode: string): mode is LogMode {
  return ['prod', 'devel', 'test'].indexOf(mode) !== -1
}
