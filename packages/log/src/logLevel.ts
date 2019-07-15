import { Logger } from 'standard-log-core';
import { getLoggers } from './getLoggers';
import { store } from './store';

/**
 * Gets the overall log level.
 */
export function getLogLevel() {
  return store.get().logLevel
}

/**
 * Sets the overall log level.
 * If the logger has its own local log level,
 * that will take precedent.
 */
export function setLogLevel(level: number) {
  store.get().logLevel = level
}

/**
 * Sets log levels on specific loggers.
 * This will override the local log level of the loggers.
 */
export function setLogLevels(filter: RegExp, level: number): Logger<any>[] {
  return getLoggers(filter).map(log => {
    log.level = level
    return log
  })
}
