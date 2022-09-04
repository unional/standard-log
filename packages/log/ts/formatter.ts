import ms from 'ms'
import { upperCase } from 'upper-case'
import { toLogLevelName } from './logLevels.js'
import type { LogEntry } from './types.js'

export type TimestampFormat = 'none' | 'iso' | 'elapsed'

export function createTimestampFormatter(format: TimestampFormat): (timestamp: Date) => string | undefined {
  switch (format) {
    case 'none':
      return (_timestamp: Date) => undefined
    case 'iso':
      return (timestamp: Date) => timestamp.toISOString()
    case 'elapsed': {
      let lastTick: number
      return (timestamp: Date) => {
        const newTick = timestamp.getTime()
        const result = ms(lastTick === undefined ? 0 : newTick - lastTick)
        lastTick = newTick
        return result
      }
    }
  }
}

export function formatLogLevel(level: number) {
  return `(${upperCase(toLogLevelName(level))})`
}

/**
 * Formats log entry as plain text with the following format:
 * `timestamp id level ...args`
 *
 * This is typically useful for writing logs to file
 */
export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, formatLogLevel(level), ...args]
}

/**
 * Formats log entry like default console log.
 */
export function consoleFormatter({ args }: LogEntry) {
  return args
}
