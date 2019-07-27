import { LogMode } from 'standard-log-core';
import { logLevel, LogLevel } from './logLevel';

export function getLogLevelByMode(mode: LogMode): LogLevel {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
