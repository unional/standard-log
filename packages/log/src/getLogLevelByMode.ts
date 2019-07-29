import { LogMode, logLevel, LogLevel } from '@standard-log/core';

export function getLogLevelByMode(mode: LogMode): LogLevel {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
