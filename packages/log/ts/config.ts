import { forEachKey } from 'type-plus'
import { addCustomLogLevel } from './customLogLevel.js'
import { ProhibitedDuringProduction } from './errors.js'
import { getDefaultReporter } from './reporter.js'
import { getLogger } from './getLogger.js'
import { store } from './store.js'
import { LogMode, LogReporter } from './types.js'

export type ConfigOptions<CustomLevelNames extends string = string> = {
  mode: LogMode,
  customLevels: Record<CustomLevelNames, number>,
  logLevel: number,
  reporters: LogReporter[]
}

export const config: { (options?: Partial<ConfigOptions>): void, readonly isLocked: boolean } = function config(options: Partial<ConfigOptions> = {}) {
  if (store.value.configured) {
    if (store.value.mode === 'production') {
      throw new ProhibitedDuringProduction('config', { ssf: config })
    }
    if (store.value.mode === 'test' && options.mode !== 'test') {
      const log = getLogger('standard-log')
      log.warn(`already configured for test, ignoring config() call`)
      return
    }
  }

  if (options.mode) store.value.mode = options.mode

  store.value.logLevel = options.logLevel !== undefined ? options.logLevel : store.value.logLevel

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
    console.warn(`'standard-log' is running in 'development' mode. Configuration is not protected.`)
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
