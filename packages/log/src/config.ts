import { forEachKey } from 'type-plus'
import { addCustomLogLevel } from './customLogLevel'
import { ProhibitedDuringProduction } from './errors'
import { getDefaultReporter } from './getDefaultReporter'
import { logLevels } from './logLevel'
import { toLogLevelName } from './logLevelFn'
import { store } from './store'
import { LogMode, LogReporter } from './types'

export type ConfigOptions = {
  mode: LogMode,
  customLevels: Record<string, number>,
  logLevel: number,
  reporters: LogReporter[]
}

export const config: { (options?: Partial<ConfigOptions>): void, readonly isLocked: boolean } = function config(options: Partial<ConfigOptions> = {}) {
  if (store.value.configured && store.value.mode === 'production') {
    throw new ProhibitedDuringProduction('config')
  }

  if (options.mode) store.value.mode = options.mode

  store.value.logLevel = options.logLevel !== undefined ? options.logLevel : logLevels.warn

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
    console.info(`'standard-log' is running in 'production' mode with log level '${toLogLevelName(store.value.logLevel)}'`)
  }
  else if (store.value.mode === 'development') {
    console.warn(`'standard-log' is configured in 'development' mode. Configuration is not protected.`)
  }
} as any

Object.defineProperty(config, 'isLocked', {
  /**
   * Gets if the config has already been locked
   */
  get() {
    return store.value.configured
  }
})
