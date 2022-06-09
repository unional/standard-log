import { mapKey, reduceByKey, reduceKey } from 'type-plus'
import { logLevels } from './logLevels.js'

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
      return store.customLevelsReverse[level] ?? getDefaultLogLevelName(level)
    },
    getLevel(name: string) {
      return store.customLevels[name] ?? (logLevels as any)[name.toLocaleLowerCase()]
    },
    getAllLevels() {
      return reduceKey(logLevels, (result, name) => {
        if (name !== 'none' && name !== 'all') result.push({ name, level: logLevels[name] })

        return result
      }, mapKey(store.customLevels, name => ({ name, level: store.customLevels[name] })))
    }
  }
}

function getDefaultLogLevelName(level: number) {
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
