import { LogMode } from '../types';
import { logLevel } from './logLevel';

export function getLogLevelByMode(mode: LogMode) {
  return mode === 'prod' ? logLevel.warn : logLevel.debug
}
