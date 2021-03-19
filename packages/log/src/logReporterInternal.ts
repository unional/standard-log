import { store } from './store'
import { LogReporter } from './types'

export function addLogReporterInternal(reporter: LogReporter) {
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
