import { logLevel } from './logLevel';
import { LogLevel, LogMode } from './types';

export function getLogLevelByMode(mode: LogMode): LogLevel {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
