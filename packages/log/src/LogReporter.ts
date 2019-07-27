import { LogReporter } from 'standard-log-core';
import { store } from './store';
import { ProhibitedDuringProduction } from './errors';

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}

export function addLogReporter(reporter: LogReporter) {
  const s = store.value
  if (s.mode === 'prod') throw new ProhibitedDuringProduction('addLogReporter')
  s.reporters.push(reporter)
}

export function clearLogReporters() {
  const reporters = store.value.reporters
  reporters.splice(0, reporters.length)
}
