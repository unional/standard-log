import { Logger, LogLevel, LogLevelListener, LogMode, LogReporter } from './types'

export type LoggerClosure<T extends string> = {
  addMethod(name: string, level: number): void,
  logger: Logger<T>
}

export type LogStore = {
  mode: LogMode,
  logLevel: LogLevel,
  loggerClosures: Record<string, LoggerClosure<any>>,
  /**
   * redirects logger to specific reporter.
   */
  redirects: Record<string, LogReporter[]>,
  reporters: LogReporter[],
  customLevels: Record<string, number>,
  customLevelsReverse: string[],
  addCustomLogLevelListeners: LogLevelListener[],
  configured: boolean
}
