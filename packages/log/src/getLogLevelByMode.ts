import { logLevel } from './logLevel';
import { LogMode } from './types';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'production' ? logLevel.warn : logLevel.debug
}
