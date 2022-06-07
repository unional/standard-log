import { addLogReporterInternal } from './logReporterInternal.js'
import { store } from './store.js'
import { LogReporter } from './types.js'
import { assertLogModeIsNotProduction } from './utils.js'

export function addLogReporter(reporter: LogReporter) {
  assertLogModeIsNotProduction('addLogReporter', addLogReporter)
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
  assertLogModeIsNotProduction('clearLogReporters', clearLogReporters)
  store.value.reporters.splice(0, store.value.reporters.length)
}
