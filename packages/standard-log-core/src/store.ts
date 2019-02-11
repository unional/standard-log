import { createStore } from 'global-store';

export const store = createStore('standard-log-core', {
  customLevels: new Map<string, number>(),
  customLevelsReverse: [] as string[]
})
