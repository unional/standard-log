import { InvalidEnvVar } from './errors.js'
import { LogMode } from './types.js'

const logModeValues = ['production', 'development', 'test']

export function getLogModeFromEnvironment(): LogMode | undefined {
  const mode = process.env.STANDARD_LOG
  if (mode === undefined || isLogMode(mode)) {
    return mode as LogMode
  }
  throw new InvalidEnvVar('STANDARD_LOG', mode, logModeValues)
}

function isLogMode(mode: string): mode is LogMode {
  return logModeValues.indexOf(mode) !== -1
}
