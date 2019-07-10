import { createConsoleLogReporter } from 'standard-log-console';
import { LogReporter, addCustomLogLevel } from 'standard-log-core';
import { store } from './store';
import { forEachKey } from 'type-plus'

export type ConfigOptions = {
  customLevels: Record<string, number>,
  logLevel: number,
  reporters: ('default' | LogReporter<any> | [string, Record<string, any>])[]
}
export function config(options: Partial<ConfigOptions>) {
  const value = store.get()
  if (options.logLevel !== undefined) {
    value.logLevel = options.logLevel
  }
  if (options.reporters) {
    const reporters = value.reporters
    reporters.splice(0, reporters.length)
    reporters.push(...buildReporters(options.reporters))
  }
  if (options.customLevels) {
    const customLevels = options.customLevels
    forEachKey(customLevels, k => {
      addCustomLogLevel(k, customLevels[k])
    })
  }
}

function buildReporters(reporters: ConfigOptions['reporters']) {
  return reporters.map(reporter => {
    if (reporter === 'default') {
      return createConsoleLogReporter({ id: 'default' })
    }
    if (Array.isArray(reporter)) {
      const [id, options] = reporter
      return createConsoleLogReporter({ id, ...options })
    }
    else {
      return reporter
    }
  })
}
