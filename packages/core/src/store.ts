import { createStore } from 'global-store';
import { LogLevelListener } from './interfaces';

export const store = createStore('standard-log-core', {
  customLevels: {} as Record<string, number>,
  customLevelsReverse: [] as string[],
  addCustomLogLevelListeners: [] as LogLevelListener[]
})
