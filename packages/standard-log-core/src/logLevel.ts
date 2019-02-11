import { store } from './store';

export const logLevel = {
  emergency: 10,
  alert: 20,
  critical: 30,
  error: 40,
  warn: 50,
  notice: 60,
  info: 70,
  debug: 80,
  trace: 90
}

export type LogLevel = keyof typeof logLevel

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
    case (level < 20):
      return 'emergency'
    case (level < 30):
      return 'alert'
    case (level < 40):
      return 'critical'
    case (level < 50):
      return 'error'
    case (level < 60):
      return 'warn'
    case (level < 70):
      return 'notice'
    case (level < 80):
      return 'info'
    case (level < 90):
      return 'debug'
    default:
      return 'trace'
  }
}
