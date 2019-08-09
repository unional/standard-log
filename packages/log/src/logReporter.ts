import { LogReporter } from './types';
import { store } from './store';
import { ProhibitedDuringProduction } from './errors';

export function addLogReporter(reporter: LogReporter) {
  if (store.value.mode === 'production') throw new ProhibitedDuringProduction('addLogReporter')

  store.value.reporters.push(reporter)
}

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}

export function clearLogReporters() {
  if (store.value.mode === 'production') throw new ProhibitedDuringProduction('clearLogReporters')
  store.value.reporters.splice(0, store.value.reporters.length)
}
