import { store } from './store';

export function stringifyLogLevel(level: number): string {
  return store.get().logLevelLookup.get(level) as string
}
