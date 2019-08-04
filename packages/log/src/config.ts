import { addCustomLogLevel, LogMode, LogReporter, ProhibitedDuringProduction } from '@standard-log/core';
import { forEachKey } from 'type-plus';
import { getLogLevelByMode } from './getLogLevelByMode';
import { store } from './store';

export type ConfigOptions = {
  mode: LogMode,
  customLevels: Record<string, number>,
  logLevel: number,
  reporters: LogReporter[]
}
export function config(options: Partial<ConfigOptions>) {
  const s = store.value

  if (Object.isFrozen(s) && s.mode === 'prod') {
    throw new ProhibitedDuringProduction('config')
  }

  if (options.mode) {
    s.mode = options.mode
  }

  s.logLevel = options.logLevel !== undefined ? options.logLevel : getLogLevelByMode(s.mode)

  if (options.customLevels) {
    const customLevels = options.customLevels
    forEachKey(customLevels, k => {
      addCustomLogLevel(k, customLevels[k])
    })
  }

  if (options.reporters) {
    s.reporters = options.reporters
  }

  if (s.mode === 'prod') store.freeze({ ...store.value, reporters: Object.freeze(store.value.reporters) })
}
