export type StandardLogOptions<CustomLevelNames extends string = string> = {
  customLevels: Record<CustomLevelNames, number>,
  logLevel: number,
  reporters: LogReporter[]
}

export interface LoggerOptions {
  level?: number,
  writeTo?: LogReporter | ReporterFilter
}

export type Logger<T extends string = LogMethodNames> = {
  readonly id: string,
  /**
   * Logger local log level.
   */
  level?: number,
  /**
   * Logs with an increment counter.
   * This is useful during debugging to check for steps executed.
   */
  count(...args: any[]): void,
  on(level: number | T, logFunction: LogFunction): void,
  /**
   * Write custom log entries.
   * This can be used along with `captureLogs()` to rewrite the logs at a later time.
   */
  write(entry: LogEntry): void
} & { [k in T]: LogMethod }

/**
 * Names of the standard log methods.
 */
export type LogMethodNames = 'emergency' | 'alert' | 'critical' | 'error' | 'warn' | 'notice' | 'info' | 'debug' | 'trace' | 'planck'

export type LogEntry = {
  id: string,
  level: number,
  // args instead of messages because it is `any[]` instead of `string[]`
  args: any[],
  timestamp: Date
}

export type LogMethod = (...args: any[]) => void

export type LogFunction = ((log: LogMethod) => void) | (() => string)

export type ReporterFilter = string | RegExp | ((reporterId: string) => boolean)

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

export interface LogReporter<T = any> {
  readonly id: string,
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  readonly formatter: LogFormatter<T>,
  /**
   * Specifies a filter to determine should the log be written.
   */
  readonly filter?: LogFilter,
  /**
   * Indicate if this is a console reporter.
   * There is only one console reporter can be present in the system.
   */
  readonly isConsoleReporter?: boolean,
  write(entry: LogEntry): void
}

export type LogReporterOptions<T = any> = {
  id?: string,
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  formatter?: LogFormatter<T>,
  /**
   * Specifies a filter to determine should the log be written.
   */
  filter?: LogFilter
}

export type LogLevel = number

export interface ConsoleLike {
  debug(...args: any[]): void,
  info(...args: any[]): void,
  warn(...args: any[]): void,
  error(...args: any[]): void,
}
