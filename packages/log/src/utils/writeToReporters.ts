import { LogEntry } from 'standard-log-core';
import { store } from '../store';

export function writeToReporters(logEntry: LogEntry) {
  store.value.reporters.forEach(r => r.write(logEntry))
}
