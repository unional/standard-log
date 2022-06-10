import { mapKey, reduceByKey, reduceKey } from 'type-plus'
import { logLevels } from './logLevels.js'
import { getDefaultReporter } from './reporter.js'
import type { Logger, LogLevel, LogReporter, StandardLogOptions } from './types.js'

export function createLogStore(options: StandardLogOptions): LogStore {
  return {
    loggers: {},
    reporters: options.reporters || [getDefaultReporter()],
    logLevel: options.logLevel,
    logLevelStore: logLevelStore(options)
  }
}

export interface LogStore {
  loggers: Record<string, Logger>,
  reporters: LogReporter[],
  logLevel: LogLevel,
  logLevelStore: ReturnType<typeof logLevelStore>
}

export interface LogLevelStoreOptions {
  customLevels?: Record<string, number>
}

export function logLevelStore(options: LogLevelStoreOptions) {
  const customLevels = options.customLevels || {}

  const store = {
    customLevels,
    customLevelsReverse: reduceByKey(customLevels, (p, k) => {
      p[customLevels[k]] = k
      return p
    }, {} as Record<number, string>)
  }
  return {
    getName(level: number) {
      return store.customLevelsReverse[level] ?? toLogLevelName(level)
    },
    getLevel(name: string) {
      return store.customLevels[name] ?? toLogLevel(name)
    },
    getAllLevels() {
      return reduceKey(logLevels, (result, name) => {
        if (name !== 'none' && name !== 'all') result.push({ name, level: logLevels[name] })

        return result
      }, mapKey(store.customLevels, name => ({ name, level: store.customLevels[name] })))
    }
  }
}

export function toLogLevelName(level: number) {
  if (level <= 100) return 'emergency'
  if (level <= 200) return 'alert'
  if (level <= 300) return 'critical'
  if (level <= 400) return 'error'
  if (level <= 500) return 'warn'
  if (level <= 600) return 'notice'
  if (level <= 700) return 'info'
  if (level <= 800) return 'debug'
  if (level <= 900) return 'trace'
  return 'planck'
}

export function toLogLevel(name: string) {
  return (logLevels as any)[name.toLocaleLowerCase()]
}
