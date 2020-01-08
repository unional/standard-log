import { upperCase } from 'upper-case';
import { toLogLevelName } from '../logLevelFn';

export function formatLogLevel(level: number) {
  return `(${upperCase(toLogLevelName(level))})`
}
