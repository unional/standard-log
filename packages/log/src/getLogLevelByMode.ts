import { logLevels } from './logLevel';
import { LogMode } from './types';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'production' ? logLevels.warn : logLevels.debug
}
