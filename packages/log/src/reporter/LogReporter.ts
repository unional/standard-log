import { ProhibitedDuringProduction } from '../errors';
import { store } from '../store';
import { LogEntry, LogReporter } from '../types';

export function getLogReporter(id: string) {
  return store.get().reporters.find(r => r.id === id)
}

export function addLogReporter(reporter: LogReporter) {
  const s = store.get()
  if (s.mode === 'prod') throw new ProhibitedDuringProduction('addLogReporter')
  s.reporters.push(reporter)
}

export function clearLogReporters() {
  const reporters = store.get().reporters
  reporters.splice(0, reporters.length)
}

export function writeToReporters(logEntry: LogEntry) {
  store.get().reporters.forEach(r => r.write(logEntry))
}
