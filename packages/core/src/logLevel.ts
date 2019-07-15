import { reduceKey } from 'type-plus';
import uppercase from 'upper-case';
import { getCustomLevel, getCustomLevelName, getCustomLevels } from './customLogLevel';


export const logLevel = {
  /**
   * none: 0
   */
  none: 0,
  /**
   * emergency: 100
   */
  emergency: 100,
  /**
   * alert: 200
   */
  alert: 200,
  /**
   * critical: 300
   */
  critical: 300,
  /**
   * error: 400
   */
  error: 400,
  /**
   * warn: 500
   */
  warn: 500,
  /**
   * notice: 600
   */
  notice: 600,
  /**
   * info: 700
   */
  info: 700,
  /**
   * debug: 800
   */
  debug: 800,
  /**
   * trace: 900
   */
  trace: 900,
  /**
   * planck: Infinity
   * `planck unit` is a very small unit <https://en.wikipedia.org/wiki/Planck_units>.
   */
  planck: Infinity,
  /**
   * all: Infinity
   */
  all: Infinity
}

export type LogMethodNames = Exclude<keyof typeof logLevel, 'none' | 'all'>

export function toLogLevel(name: string): number | undefined {
  return getCustomLevel(name) || (logLevel as any)[name]
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
  return reduceKey(logLevel, (result, name) => {
    if (name !== 'none' && name !== 'all') result.push({ name, level: logLevel[name] })

    return result
  }, getCustomLevels())
}

export function toLogLevelDisplay(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
