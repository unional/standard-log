import { LogLevel } from './logLevel';

export type Logger<T extends string = LogLevel> = {
  id: string
} & {
    [k in T]: (...args: any[]) => void
  }

export type LogEntry = {
  loggerId: string
  level: number
  messages: any[]
  timestamp: Date
}

/**
 * Format a log entry.
 * Depends on
 */
export type LogFormatter<T = string> = (entry: LogEntry) => T

/**
 * Determines whether the entry should be written.
 */
export type LogFilter = (entry: LogEntry) => boolean

export type LogReporter<T> = {
  formatter?: LogFormatter<T>
  filter?: LogFilter
  write(entry: LogEntry): void
}
