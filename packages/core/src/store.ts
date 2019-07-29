import { createStore } from 'global-store';
import { LogLevel } from './logLevel';
import { LogReporter } from './LogReporter';
import { Logger, LogLevelListener, LogMode } from './types';

export type LogStore = {
  mode: LogMode,
  logLevel: LogLevel,
  loggers: Record<string, Logger<any>>,
  reporters: LogReporter[],
  configured: boolean,
  customLevels: Record<string, number>,
  customLevelsReverse: string[],
  addCustomLogLevelListeners: LogLevelListener[]
}

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: 0,
  initializer: current => ({
    mode: 'prod',
    logLevel: 0,
    loggers: {},
    reporters: [],
    configured: false,
    customLevels: {},
    customLevelsReverse: [],
    addCustomLogLevelListeners: [],
    ...current
  })
})
