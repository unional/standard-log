import isNode from 'is-node'
import { LogEntry } from '../LogEntry.js'

export const toInspectLogEntry = isNode
  ? (() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const inspect = require('util').inspect
    return (e: LogEntry) => (
      e.args = e.args.map(value => typeof value === 'object' && value !== null ? inspect(value) : value),
      e)
  })()
  // istanbul ignore next
  : (e: LogEntry) => e
