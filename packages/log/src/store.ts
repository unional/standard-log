import { createStore } from 'global-store';
import { createConsoleReporter } from './console';
import { logLevel } from './core';
import { getMode } from './env';
import { isBrowser } from './isBrowser';
import { Logger, LogLevelListener, LogMode, LogReporter } from './types';
import { getLogLevelByMode } from './util';

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

export const store = createStore('standard-log:e53d0937-f420-40a0-9901-099725fa4a53', createStoreDefault())
export const internalStore = createStore('standard-log:internal:36d5c19b-98e2-4ac8-b664-f49075c96b8b', { addCustomLogLevelListeners: [] as LogLevelListener[] })

export function resetStore() {
  store.set(createStoreDefault())
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

function getDefaultReporter() {
  try {
    // tricks webpack to not bundle standard-log-console
    const c = '-console'
    const consoleModule = require('standard-log' + c)
    return consoleModule.createConsoleReporter()
  }
  catch (e) {
    return createConsoleReporter()
  }
}
