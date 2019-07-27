import { logLevel, LogLevel } from './logLevel';
import { LogMode } from './types';

export function getLogLevelByMode(mode: LogMode): LogLevel {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
