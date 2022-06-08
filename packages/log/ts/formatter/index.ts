import ms from 'ms'
import { upperCase } from 'upper-case'
import { toLogLevelName } from '../logLevelFn.js'
import type { LogEntry } from '../types.js'

export type TimestampFormat = 'none' | 'iso' | 'elapsed'

export function createTimestampFormatter(format: TimestampFormat) {
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

export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, formatLogLevel(level), ...args]
}
