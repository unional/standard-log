import { createStore } from 'global-store';
import { createConsoleLogReporter } from 'standard-log-console';
import { Logger, logLevel, LogReporter, isBrowser } from 'standard-log-core';
import { RuntimeMode } from './types';
import { getMode } from './env';

function createStoreDefault() {
  const envDefaults = getEnvironmentDefaults()
  return Object.assign(envDefaults, {
    loggers: {} as Record<string, Logger<any>>,
    reporters: [createConsoleLogReporter()] as LogReporter[],
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
      mode: 'prod' as RuntimeMode,
      logLevel: logLevel.warn
    }
  }
  else {
    const mode = getMode(process.env)
    return {
      mode,
      logLevel: mode === 'prod' ? logLevel.warn : logLevel.debug
    }
  }
}
