import { forEachKey, mapKey } from 'type-plus';
import { store } from './store';
import { LogLevelEntry } from './types';
import { writeToReporters } from './writeToReporters';

/**
 * @param level the `logLevel` number.
 * You can specify this in the form of `logLevel.<x> + n` to make it more readable.
 */
export function addCustomLogLevel(name: string, level: number) {
  const { customLevels, customLevelsReverse } = store.value
  customLevels[name] = level
  customLevelsReverse[level] = name
  const { loggers } = store.value
  forEachKey(loggers, id => loggers[id][name] = (...args: any[]) => writeToReporters({ id, level, args, timestamp: new Date() }))
}

export function clearCustomLogLevel() {
  const { customLevels, customLevelsReverse } = store.value
  // Don't replace the object would prevent reference divergence
  forEachKey(customLevels, k => delete customLevels[k])
  customLevelsReverse.splice(0, customLevelsReverse.length)
}

export function getCustomLevel(name: string): number | undefined {
  return store.value.customLevels[name]
}

export function getCustomLevelName(level: number): string | undefined {
  return store.value.customLevelsReverse[level]
}

export function getCustomLevels(): LogLevelEntry[] {
  const { customLevels } = store.value
  return mapKey(customLevels, name => ({ name, level: customLevels[name] }))
}
