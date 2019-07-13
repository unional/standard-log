import { createStore } from 'global-store';
import { createConsoleLogReporter } from 'standard-log-console';
import { Logger, logLevel, LogReporter } from 'standard-log-core';
import { RuntimeMode } from './types';

function createStoreDefault() {
  return {
    mode: 'prod' as RuntimeMode,
    loggers: {} as Record<string, Logger<any>>,
    reporters: [createConsoleLogReporter()] as LogReporter[],
    logLevel: logLevel.warn,
    configured: false
  }
}

export const store = createStore('standard-log:e53d0937-f420-40a0-9901-099725fa4a53', createStoreDefault())

export function resetStore() {
  store.set(createStoreDefault())
}
