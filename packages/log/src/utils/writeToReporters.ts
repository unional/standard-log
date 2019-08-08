import { store } from '../store';
import { LogEntry } from '../types';
import { getConfiguredStore } from '../getConfiguredStore';

export function writeToReporters(logEntry: LogEntry) {
  if (store.value.mode === 'test')
    writeToReporters.fn(logEntry)
  else
    setImmediate(() => writeToReporters.fn(logEntry))
}

// istanbul ignore next
writeToReporters.fn = (logEntry: LogEntry) => {
  getConfiguredStore().value.reporters.forEach(r => r.write(logEntry!))
}
