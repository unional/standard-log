import uppercase from 'upper-case';
import { toLogLevelName } from '../logLevelFn';

export function formatLogLevel(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
