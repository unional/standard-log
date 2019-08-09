import { store } from './store';
import { LogReporter } from './types';
import { assertLogModeIsNotProduction } from './utils';

export function addLogReporter(reporter: LogReporter) {
  assertLogModeIsNotProduction('addLogReporter')
  store.value.reporters.push(reporter)
}

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}

export function clearLogReporters() {
  assertLogModeIsNotProduction('clearLogReporters')
  store.value.reporters.splice(0, store.value.reporters.length)
}
