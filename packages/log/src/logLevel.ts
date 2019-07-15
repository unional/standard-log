import { store } from './store';

export function getLogLevel() {
  return store.get().logLevel
}

export function setLogLevel(level: number) {
  store.get().logLevel = level
}
