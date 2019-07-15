import { store } from './store';
import { forEachKey } from 'type-plus';

export function getLogLevel() {
  return store.get().logLevel
}

export function setLogLevel(level: number) {
  const s = store.get()
  forEachKey(s.loggers, key => s.loggers[key].level = level)
  s.logLevel = level
}
