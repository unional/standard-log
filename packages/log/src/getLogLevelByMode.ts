import { LogMode, logLevel } from 'standard-log-core';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
