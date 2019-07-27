import { LogMode, LogReporter } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { addCustomLogLevel } from './customLogLevel';
import { ProhibitedDuringProduction } from './errors';
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

  if (s.configured) {
    switch (s.mode) {
      case 'devel':
        console.warn('standard-log has been configured before. Overriding. `config()` should only be called once by the application')
        break;
      case 'prod':
        throw new ProhibitedDuringProduction('config')
    }
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
  s.configured = true
}
