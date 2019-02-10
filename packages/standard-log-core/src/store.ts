import { create } from 'global-store';

export const store = create('standard-log-core', {
  customLevels: new Map<string, number>(),
  customLevelsReverse: [] as string[]
})
