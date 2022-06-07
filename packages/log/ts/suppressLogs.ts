import { logLevels } from './logLevel.js'
import { Logger } from './types.js'

/**
 * Suppress logging within the code block.
 */
export function suppressLogs<R>(block: () => R, log: Logger, ...logs: Logger[]): R
export function suppressLogs<R>(block: () => R, ...logs: Logger[]): R {
  const origLevels = logs.map(l => l.level)
  logs.forEach(l => l.level = logLevels.none)
  const result = block()
  logs.forEach((l, i) => l.level = origLevels[i])
  return result
}