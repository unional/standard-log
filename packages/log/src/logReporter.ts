import { addLogReporterInternal } from './logReporterInternal'
import { store } from './store';
import { LogReporter } from './types';
import { assertLogModeIsNotProduction } from './utils';

export function addLogReporter(reporter: LogReporter) {
  assertLogModeIsNotProduction('addLogReporter')
  addLogReporterInternal(reporter)
}

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}

export function hasConsoleReporter() {
  return store.value.reporters.some(r => r.isConsoleReporter)
}

export function getConsoleReporter() {
  return store.value.reporters.find(r => r.isConsoleReporter)
}

export function clearLogReporters() {
  assertLogModeIsNotProduction('clearLogReporters')
  store.value.reporters.splice(0, store.value.reporters.length)
}
