import { addCustomLogLevel, LogReporter } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { store } from './store';
import { RuntimeMode } from './types';

export type ConfigOptions = {
  mode: RuntimeMode,
  customLevels: Record<string, number>,
  logLevel: number,
  reporters: LogReporter[]
}
export function config(options: Partial<ConfigOptions>) {
  const s = store.get()
  if (options.mode) {
    s.mode = options.mode
  }

  if (options.logLevel !== undefined) {
    s.logLevel = options.logLevel
  }

  if (options.customLevels) {
    const customLevels = options.customLevels
    forEachKey(customLevels, k => {
      addCustomLogLevel(k, customLevels[k])
    })
  }

  if (options.reporters) {
    s.reporters = options.reporters
  }
}
