import { createStore } from 'global-store';
import { createConsoleLogReporter } from 'standard-log-console';
import { Logger, logLevel, LogReporter } from 'standard-log-core';

function createStoreDefault() {
  return {
    loggers: {} as Record<string, Logger>,
    reporters: [createConsoleLogReporter({ id: 'default' })] as LogReporter<any>[],
    logLevel: logLevel.warn
  }
}

export const store = createStore('standard-log', createStoreDefault())

export function resetStore() {
  store.set(createStoreDefault())
}
