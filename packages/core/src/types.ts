
export type LogMode = 'devel' | 'prod' | 'test'

export type LogMethodNames = 'emergency' | 'alert' | 'critical' | 'error' | 'warn' | 'notice' | 'info' | 'debug' | 'trace' | 'planck'
export type LogMethod = (...args: any[]) => void
export type LogFunction = ((log: LogMethod) => void) | (() => string)

export type Logger<T extends string = LogMethodNames> = {
  id: string,
  /**
   * Logger local log level.
   */
  level?: number,
  /**
   * Logs with an increment counter.
   * This is useful during debugging to check for steps executed.
   */
  count(...args: any[]): void,
  on(level: number | T, logFunction: LogFunction): void
} & {
    [k in T]: (...args: any[]) => void
  }

export type LogEntry = {
  id: string
  level: number
  // args instead of messages because it is `any[]` instead of `string[]`
  args: any[]
  timestamp: Date
}

/**
 * Formats a log entry.
 * Depends on the reporter, it can expect a different return type.
 * By default the return type is `any[]` which `console` accepts.
 */
export type LogFormatter<T = any[]> = (entry: LogEntry) => T

/**
 * Determines whether the entry should be written.
 */
export type LogFilter = (entry: LogEntry) => boolean

export type LogLevelEntry = { name: string, level: number }

export type LogReporter<T = any> = {
  id: string
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  formatter?: LogFormatter<T>
  write(entry: LogEntry): void
}

export type LogReporterOptions<T = any> = {
  id?: string
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  formatter?: LogFormatter<T>
  /**
   * Specifies a filter to determine should the log be written.
   */
  filter?: LogFilter
}

export type LogLevelListener = (logLevelEntry: LogLevelEntry) => void
