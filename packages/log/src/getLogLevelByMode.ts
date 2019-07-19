import { LogMode } from 'standard-log-core';
import { logLevel } from './logLevel';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
