import { store } from './store';

export const logLevel = {
  none: 0,
  emergency: 100,
  alert: 200,
  critical: 300,
  error: 400,
  warn: 500,
  notice: 600,
  info: 700,
  debug: 800,
  trace: 900,
  planck: Infinity,
  all: Infinity
}

export type LogLevel = Exclude<keyof typeof logLevel, 'none' | 'all'>

export function addCustomLogLevel(name: string, level: number) {
  const { customLevels, customLevelsReverse } = store.get()

  customLevels.set(name, level)
  customLevelsReverse[level] = name
}

export function clearCustomLogLevel() {
  const { customLevels, customLevelsReverse } = store.get()
  customLevels.clear()
  customLevelsReverse.splice(0, customLevelsReverse.length)
}

export function toLogLevel(name: string): number | undefined {
  return store.get().customLevels.get(name) || (logLevel as any)[name]
}

export function toLogLevelName(level: number) {
  const custom = store.get().customLevelsReverse[level]
  if (custom) return custom
  switch (true) {
    case (level <= 100):
      return 'emergency'
    case (level <= 200):
      return 'alert'
    case (level <= 300):
      return 'critical'
    case (level <= 400):
      return 'error'
    case (level <= 500):
      return 'warn'
    case (level <= 600):
      return 'notice'
    case (level <= 700):
      return 'info'
    case (level <= 800):
      return 'debug'
    case (level <= 900):
      return 'trace'
    default:
      return 'planck'
  }
}
