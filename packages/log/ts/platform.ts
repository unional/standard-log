import { inspect } from 'util'
import type { ConsoleLike, LogEntry } from './types.js'

export const toInspectLogEntry = (e: LogEntry) => (
  e.args = e.args.map(value => typeof value === 'object' && value !== null ? inspect(value) : value),
  e)

export const polyfill: { console?: ConsoleLike } = {}
