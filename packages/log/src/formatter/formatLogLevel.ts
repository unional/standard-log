import uppercase from 'upper-case';
import { toLogLevelName } from '../logLevel';

export function formatLogLevel(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
