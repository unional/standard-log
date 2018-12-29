import { findKey } from 'type-plus';
import { logLevel } from './logLevel';

export function getLogMethodName(level: number) {
  return findKey(logLevel, name => logLevel[name] >= level) || 'debug'
}
