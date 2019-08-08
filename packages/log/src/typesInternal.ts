import { Logger, LogLevel, LogLevelListener, LogMode, LogReporter } from './types';

export type LogStore = {
  mode: LogMode,
  logLevel: LogLevel,
  loggers: Record<string, Logger<any>>,
  reporters: LogReporter[],
  customLevels: Record<string, number>,
  customLevelsReverse: string[],
  addCustomLogLevelListeners: LogLevelListener[],
  configured: boolean
}
