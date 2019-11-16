import { config } from './config';
import { store } from './store';
import { LogEntry } from './types';

export function writeToReporters(logEntry: LogEntry, filter: (reporterId: string) => boolean) {
  writeToReporters.fn(logEntry, filter)
}

// istanbul ignore next
writeToReporters.fn = (logEntry: LogEntry, filter: (reporterId: string) => boolean) => {
  getConfiguredStore().value.reporters.filter(r => filter(r.id)).forEach(r => r.write(logEntry!))
}

function getConfiguredStore() {
  if (!store.value.configured) config()
  return store
}
