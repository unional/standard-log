import { createMemoryLogReporter } from './memory'
import { LogEntry, Logger, LogReporter } from './types'
import { store } from './store'
import { isPromise } from 'type-plus'

export function captureLogs(logger: Logger, funcBlock: () => Promise<any>): Promise<LogEntry[]>
export function captureLogs(logger: Logger, funcBlock: () => void): LogEntry[]
export function captureLogs(logger: Logger, funcBlock: Function): LogEntry[] | Promise<LogEntry[]> {
  const reporter = createMemoryLogReporter()
  addRedirect(logger.id, reporter)

  try {
    const result = funcBlock()
    if (isPromise(result)) {
      return result.then(() => reporter.logs)
        .finally(() => removeRedirect(logger.id, reporter))
    }
    removeRedirect(logger.id, reporter)
    return reporter.logs
  }
  catch (e) {
    removeRedirect(logger.id, reporter)
    throw e
  }
}

function addRedirect(id: string, reporter: LogReporter) {
  const redirect = store.value.redirects[id] || []
  redirect.push(reporter)
  store.value.redirects[id] = redirect
}

function removeRedirect(id: string, reporter: LogReporter) {
  store.value.redirects[id] = store.value.redirects[id].filter(r => r !== reporter)
}
