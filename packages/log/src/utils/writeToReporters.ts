import { store } from '../store';
import { LogEntry } from '../types';

export function writeToReporters(logEntry: LogEntry) {
  writeToReporters.fn(logEntry)
}

writeToReporters.fn = (logEntry: LogEntry) => {
  // istanbul ignore next
  setImmediate(() => store.value.reporters.forEach(r => r.write(logEntry!)))
}
