import { getConsoleReporter } from './logReporter.js'
import { store } from './store.js'
import { LogReporter } from './types.js'

export function addLogReporterInternal(reporter: LogReporter) {
  if (reporter.isConsoleReporter) {
    const r = getConsoleReporter()
    if (r && reporter.filter) {
      const f = r.filter
      const f2 = reporter.filter
      if (f) r.filter = entry => f(entry) && f2(entry)
      else r.filter = f2
    }
  }
  else {
    store.value.reporters.push(reporter)
  }
}
