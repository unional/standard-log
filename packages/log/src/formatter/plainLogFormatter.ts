import { LogEntry } from '../types'
import { formatLogLevel } from './formatLogLevel'

export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, formatLogLevel(level), ...args]
}
