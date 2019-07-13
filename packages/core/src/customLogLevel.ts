import { forEachKey, mapKey } from 'type-plus';
import { LogLevelListener, LogLevelEntry } from './types';
import { store } from './store';

/**
 * @param level the `logLevel` number.
 * You can specify this in the form of `logLevel.<x> + n` to make it more readable.
 */
export function addCustomLogLevel(name: string, level: number) {
  const { customLevels, customLevelsReverse, addCustomLogLevelListeners } = store.get()
  customLevels[name] = level
  customLevelsReverse[level] = name
  addCustomLogLevelListeners.forEach(l => l({ name, level }))
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

export function onAddCustomLogLevel(listener: LogLevelListener) {
  store.get().addCustomLogLevelListeners.push(listener)
  return {
    unsubscribe() {
      const bag = store.get().addCustomLogLevelListeners
      const i = bag.indexOf(listener)
      if (i >= 0) bag.splice(i, 1)
    }
  }
}
