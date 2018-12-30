import { getLoggers } from './getLoggers'
import { Logger } from './interfaces'
import { store } from './store';
import { forEachKey } from 'type-plus'
/**
 * Sets log level based on filter.
 * @param logLevel Use logLevel.* to set this value. 0 - none; 10 - error; 20 - warn; 30 - info; 40 - debug
 */
export function setLevels(filter: RegExp, logLevel: number): Logger[] {
  return getLoggers(filter).map(log => {
    log.level = logLevel
    return log
  })
}

export function setLevel(logLevel: number) {
  const logs = store.get().logs
  forEachKey(logs, key => logs[key].level = logLevel)
  store.get().logLevel = logLevel
}

export function getLevel() {
  return store.get().logLevel
}
