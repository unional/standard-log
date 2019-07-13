import { createStore } from 'global-store';
import { LogLevelListener } from './types';

export const store = createStore('standard-log-core:8806f078-41e0-4fce-a88d-9f782d2bfc66', {
  customLevels: {} as Record<string, number>,
  customLevelsReverse: [] as string[],
  addCustomLogLevelListeners: [] as LogLevelListener[]
})
