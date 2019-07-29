import { store } from '../store';
import { LogEntry } from '../types';

export function writeToReporters(logEntry: LogEntry) {
  writeToReporters.fn(logEntry)
}

writeToReporters.fn = (logEntry: LogEntry) => {
  if (store.value.mode === 'test')
    store.value.reporters.forEach(r => r.write(logEntry!))
  else
    // istanbul ignore next
    setImmediate(() => store.value.reporters.forEach(r => r.write(logEntry!)))
}
