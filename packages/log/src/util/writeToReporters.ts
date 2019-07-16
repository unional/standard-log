import { store } from '../store';
import { LogEntry } from '../types';

export function writeToReporters(logEntry: LogEntry) {
  store.get().reporters.forEach(r => r.write(logEntry))
}
