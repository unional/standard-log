import { Logger } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { getLoggers } from './getLoggers';
import { store } from './store';

export function getLogLevel() {
  return store.get().logLevel
}

export function setLogLevel(level: number) {
  const s = store.get()
  forEachKey(s.loggers, key => s.loggers[key].level = level)
  s.logLevel = level
}

export function setLogLevels(filter: RegExp, level: number): Logger<any>[] {
  return getLoggers(filter).map(log => {
    log.level = level
    return log
  })
}
