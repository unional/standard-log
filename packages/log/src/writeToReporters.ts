import { config } from './config';
import { store } from './store';
import { LogEntry } from './types';

export function writeToReporters(logEntry: LogEntry) {
  if (store.value.mode === 'test')
    writeToReporters.fn(logEntry)
  else
    setTimeout(() => writeToReporters.fn(logEntry), 0)
}

// istanbul ignore next
writeToReporters.fn = (logEntry: LogEntry) => {
  getConfiguredStore().value.reporters.forEach(r => r.write(logEntry!))
}

function getConfiguredStore() {
  if (!store.value.configured) {
    config()
  }
  return store
}
