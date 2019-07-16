import { forEachKey, mapKey } from 'type-plus';
import { store } from '../store';
import { LogLevelEntry } from '../types';
import { writeToReporters } from '../util';

/**
 * @param level the `logLevel` number.
 * You can specify this in the form of `logLevel.<x> + n` to make it more readable.
 */
export function addCustomLogLevel(name: string, level: number) {
  const { customLevels, customLevelsReverse } = store.get()

  customLevels[name] = level
  customLevelsReverse[level] = name

  const { loggers } = store.get()
  forEachKey(loggers, id => loggers[id][name] = (...args: any[]) => writeToReporters({ id, level, args, timestamp: new Date() }))
}

export function clearCustomLogLevel() {
  const { customLevels, customLevelsReverse } = store.get()
  // Don't replace the object would prevent reference divergence
  forEachKey(customLevels, k => delete customLevels[k])
  customLevelsReverse.splice(0, customLevelsReverse.length)
}

export function getCustomLevel(name: string): number | undefined {
  return store.get().customLevels[name]
}

export function getCustomLevelName(level: number): string | undefined {
  return store.get().customLevelsReverse[level]
}

export function getCustomLevels(): LogLevelEntry[] {
  const { customLevels } = store.get()
  return mapKey(customLevels, name => ({ name, level: customLevels[name] }))
}

