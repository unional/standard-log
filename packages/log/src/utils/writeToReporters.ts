import { store } from '../store';
import { LogEntry } from '../types';

const doneDefers: Array<() => void> = []

export function writeToReporters(logEntry: LogEntry) {
  setImmediate(() => {
    store.value.reporters.forEach(r => r.write(logEntry))
    doneDefers.forEach(l => l())
  })
}

/**
 * Resolves when write is completed.
 * This is used for internal testing.
 */
export function writeDone(ms = 10): Promise<void> {
  return new Promise((a, r) => {
    doneDefers.push(a)
    setTimeout(r, ms)
  })
}
