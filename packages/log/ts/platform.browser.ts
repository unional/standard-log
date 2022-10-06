import { record } from 'type-plus'
import type { ConsoleLike, LogEntry } from './types.js'

export const toInspectLogEntry = (e: LogEntry) => e

export const polyfill: { console?: ConsoleLike } = record()
