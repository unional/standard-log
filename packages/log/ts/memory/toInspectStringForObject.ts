import { LogEntry } from '../LogEntry.js'
import { inspect } from 'util'

export const toInspectLogEntry = (e: LogEntry) => (
  e.args = e.args.map(value => typeof value === 'object' && value !== null ? inspect(value) : value),
  e)
