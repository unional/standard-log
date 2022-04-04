import { AnyFunction, isPromise } from 'type-plus'
import { createMemoryLogReporter } from './memory'
import { store } from './store'
import { LogEntry, Logger, LogReporter } from './types'

export function captureLogs<R>(logger: Logger, funcBlock: () => Promise<R>): Promise<[R, LogEntry[]]>
export function captureLogs<R>(logger: Logger, funcBlock: () => R): [R, LogEntry[]]
export function captureLogs(logger: Logger, funcBlock: AnyFunction) {
  const reporter = createMemoryLogReporter()
  addRedirect(logger.id, reporter)

  try {
    const result = funcBlock()
    if (isPromise(result)) {
      return result.then((r) => [r, reporter.logs])
        .finally(() => removeRedirect(logger.id, reporter))
    }
    removeRedirect(logger.id, reporter)
    return [result, reporter.logs]
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
