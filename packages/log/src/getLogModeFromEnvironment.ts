import { InvalidEnvVar } from './errors';
import { LogMode } from './types';

const logModeValues = ['production', 'development', 'test']

export function getLogModeFromEnvironment(): LogMode | undefined {
  const mode = process.env.STANDARD_LOG
  if (mode === undefined || isLogMode(mode)) {
    return mode
  }
  throw new InvalidEnvVar('STANDARD_LOG', mode, logModeValues)
}

function isLogMode(mode: string): mode is LogMode {
  return logModeValues.indexOf(mode) !== -1
}
