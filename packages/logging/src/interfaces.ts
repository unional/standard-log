
export type LogMethod = (...args: any[]) => void
export type LogFunction = ((log: LogMethod) => void) | (() => string)

export type Logger = {
  id: string
  level: number
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  onError(logFunction: LogFunction): void
  onWarn(logFunction: LogFunction): void
  onInfo(logFunction: LogFunction): void
  onDebug(logFunction: LogFunction): void
}

/**
 * Implemented by classes which wish to append log data to a target data store.
 */
export interface Appender {
  debug(logger: Logger, ...rest: any[]): void;
  info(logger: Logger, ...rest: any[]): void;
  warn(logger: Logger, ...rest: any[]): void;
  error(logger: Logger, ...rest: any[]): void;
}
