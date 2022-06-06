import { config } from './config.js'
import { store } from './store.js'
import { LogEntry } from './types.js'

export function writeToReporters(logEntry: LogEntry, filter: (reporterId: string) => boolean) {
  writeToReporters.fn(logEntry, filter)
}

// istanbul ignore next
writeToReporters.fn = (logEntry: LogEntry, filter: (reporterId: string) => boolean) => {
  const store = getConfiguredStore()
  const redirect = store.value.redirects[logEntry.id]
  const reporters = redirect && redirect.length > 0 ? redirect : store.value.reporters
  reporters.filter(r => filter(r.id)).forEach(r => r.write(logEntry!))
}

function getConfiguredStore() {
  if (!store.value.configured) config()
  return store
}
