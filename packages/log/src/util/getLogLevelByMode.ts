import { logLevel } from '../core';
import { LogMode } from '../types';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
