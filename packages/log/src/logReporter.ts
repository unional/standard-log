import { store } from './store';
import { LogReporter } from './types';
import { assertLogModeIsNotProduction } from './utils';

export function addLogReporter(reporter: LogReporter) {
  assertLogModeIsNotProduction('addLogReporter')
  if (reporter.isConsoleReporter) {
    const i = store.value.reporters.findIndex(r => r.isConsoleReporter)
    const r = store.value.reporters[i]
    store.value.reporters.splice(i, 1)
    if (r.filter) {
      if (reporter.filter) {
        const f2 = reporter.filter
        reporter.filter = entry => r.filter!(entry) && f2(entry)
      }
      else {
        reporter.filter = r.filter
      }
    }
  }
  store.value.reporters.push(reporter)
}

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}

export function hasConsoleReporter() {
  return store.value.reporters.some(r => r.isConsoleReporter)
}

export function clearLogReporters() {
  assertLogModeIsNotProduction('clearLogReporters')
  store.value.reporters.splice(0, store.value.reporters.length)
}
