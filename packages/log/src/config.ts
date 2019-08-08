import { forEachKey } from 'type-plus';
import { addCustomLogLevel } from './customLogLevel';
import { ProhibitedDuringProduction } from './errors';
import { getDefaultReporter } from './getDefaultReporter';
import { store } from './store';
import { LogMode, LogReporter } from './types';

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

  if (options.mode) s.mode = options.mode


  if (s.mode !== 'prod') console.warn(`standard-log is configured in '${s.mode}' mode. Remember to configure it as 'prod' in production.`)

  if (options.logLevel !== undefined) s.logLevel = options.logLevel

  if (options.customLevels) {
    const customLevels = options.customLevels
    forEachKey(customLevels, k => {
      addCustomLogLevel(k, customLevels[k])
    })
  }

  s.reporters = options.reporters || [getDefaultReporter()]
  s.configured = true

  if (s.mode === 'prod') store.freeze({ ...store.value, reporters: Object.freeze(store.value.reporters) })
}
