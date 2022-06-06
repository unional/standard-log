import { LogEntry } from '../types.js'
import { formatLogLevel } from './formatLogLevel.js'

export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, formatLogLevel(level), ...args]
}
