import { createStore } from 'global-store';
import { createConsoleLogReporter } from './console';
import { logLevel } from './core';
import { getMode } from './env';
import { isBrowser } from './isBrowser';
import { Logger, LogMode, LogReporter } from './types';
import { getLogLevelByMode } from './util';

export type Store = {
  mode: LogMode,
  logLevel: number,
  loggers: Record<string, Logger<any>>,
  reporters: LogReporter[],
  configured: boolean,
  customLevels: Record<string, number>,
  customLevelsReverse: string[]
}
export const store = createStore<Store>('standard-log:e53d0937-f420-40a0-9901-099725fa4a53', {
  mode: 'prod',
  logLevel: 0,
  loggers: {},
  reporters: [],
  configured: false,
  customLevels: {},
  customLevelsReverse: []
})

export function resetStore() {
  store.set(createStoreDefault())
}

function createStoreDefault() {
  const envDefaults = getEnvironmentDefaults()
  const reporter = getDefaultReporter()
  return Object.assign(envDefaults, {
    loggers: {} as Record<string, Logger<any>>,
    reporters: [reporter] as LogReporter[],
    configured: false,
    customLevels: {} as Record<string, number>,
    customLevelsReverse: [] as string[]
  })
}

function getEnvironmentDefaults() {
  // istanbul ignore next
  if (isBrowser()) {
    return {
      mode: 'prod' as LogMode,
      logLevel: logLevel.warn
    }
  }
  else {
    const mode = getMode(process.env)
    return {
      mode,
      logLevel: getLogLevelByMode(mode)
    }
  }
}

// istanbul ignore next
function getDefaultReporter() {
  try {
    // tricks webpack to not bundle standard-log-console
    const c = '-color'
    const consoleModule = require('standard-log' + c)
    return consoleModule.createColorLogReporter()
  }
  catch (e) {
    return createConsoleLogReporter()
  }
}
