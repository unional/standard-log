import { reduceKey } from 'type-plus'
import { getCustomLevel, getCustomLevelName, getCustomLevels } from './customLogLevel.js'
import { getLoggers } from './getLoggers.js'
import { logLevels } from './logLevel.js'
import { store } from './store.js'
import { Logger } from './types.js'

/**
 * Gets the overall log level.
 */
export function getLogLevel() {
  return store.value.logLevel
}

/**
 * Sets the overall log level.
 * If the logger has its own local log level,
 * that will take precedent.
 */
export function setLogLevel(level: number) {
  store.value.logLevel = level
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

export function toLogLevel(name: string): number | undefined {
  return getCustomLevel(name) || (logLevels as any)[name.toLowerCase()]
}

export function toLogLevelName(level: number) {
  const custom = getCustomLevelName(level)
  if (custom) return custom
  switch (true) {
    case (level <= 100):
      return 'emergency'
    case (level <= 200):
      return 'alert'
    case (level <= 300):
      return 'critical'
    case (level <= 400):
      return 'error'
    case (level <= 500):
      return 'warn'
    case (level <= 600):
      return 'notice'
    case (level <= 700):
      return 'info'
    case (level <= 800):
      return 'debug'
    case (level <= 900):
      return 'trace'
    default:
      return 'planck'
  }
}

export function getAllLogLevels() {
  return reduceKey(logLevels, (result, name) => {
    if (name !== 'none' && name !== 'all') result.push({ name, level: logLevels[name] })

    return result
  }, getCustomLevels())
}
