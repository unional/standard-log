import { store } from '../store';
import { LogEntry } from '../types';

export function writeToReporters(logEntry: LogEntry) {
  if (store.value.mode === 'test')
    writeToReporters.fn(logEntry)
  else
    setImmediate(() => writeToReporters.fn(logEntry))
}

// istanbul ignore next
writeToReporters.fn = (logEntry: LogEntry) => {
  store.value.reporters.forEach(r => r.write(logEntry!))
}
