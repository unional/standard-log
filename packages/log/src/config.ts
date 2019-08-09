import { forEachKey } from 'type-plus';
import { addCustomLogLevel } from './customLogLevel';
import { ProhibitedDuringProduction } from './errors';
import { getDefaultReporter } from './getDefaultReporter';
import { store } from './store';
import { LogMode, LogReporter } from './types';
import { getLogLevelByMode } from './getLogLevelByMode';

export type ConfigOptions = {
  mode: LogMode,
  customLevels: Record<string, number>,
  logLevel: number,
  reporters: LogReporter[]
}

export function config(options: Partial<ConfigOptions>) {
  if (store.value.configured && store.value.mode === 'production') {
    throw new ProhibitedDuringProduction('config')
  }

  if (options.mode) store.value.mode = options.mode

  store.value.logLevel = options.logLevel !== undefined ?
    options.logLevel : getLogLevelByMode(store.value.mode)

  if (options.customLevels) {
    const customLevels = options.customLevels
    forEachKey(customLevels, k => {
      addCustomLogLevel(k, customLevels[k])
    })
  }

  store.value.reporters = options.reporters || [getDefaultReporter()]
  store.value.configured = true

  if (store.value.mode === 'production') {
    store.freeze({ ...store.value, reporters: Object.freeze(store.value.reporters) })
  }
  else if (store.value.mode === 'development') {
    console.warn(`standard-log is configured in 'development' mode. Configuration is not protected.`)
  }
}
