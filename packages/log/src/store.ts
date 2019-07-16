import { createStore } from 'global-store';
import { Logger, logLevel, LogReporter, isBrowser, LogMode } from 'standard-log-core';
import { getMode } from './env';
import { getLogLevelByMode } from './getLogLevelByMode';
import { createConsoleReporter } from './console';

function createStoreDefault() {
  const envDefaults = getEnvironmentDefaults()
  const reporter = getDefaultReporter()
  return Object.assign(envDefaults, {
    loggers: {} as Record<string, Logger<any>>,
    reporters: [reporter] as LogReporter[],
    configured: false
  })
}

export const store = createStore('standard-log:e53d0937-f420-40a0-9901-099725fa4a53', createStoreDefault())

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
