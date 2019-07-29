import { createStore } from 'global-store';
import { LogLevel } from './logLevel';
import { LogReporter } from './LogReporter';
import { Logger, LogMode } from './types';

export type LogStore = {
  mode: LogMode,
  logLevel: LogLevel,
  loggers: Record<string, Logger<any>>,
  reporters: LogReporter[],
  configured: boolean,
  customLevels: Record<string, number>,
  customLevelsReverse: string[]
}

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: 0,
  initializer: current => ({
    mode: 'prod',
    logLevel: 500, // logLevel.warn. avoid cir-dep
    loggers: {},
    reporters: [],
    configured: false,
    customLevels: {},
    customLevelsReverse: [],
    ...current
  })
})
