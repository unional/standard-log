import type { LogEntry } from '../types.js'

export const toInspectLogEntry = (e: LogEntry) => e
export function isConsoleDebugAvailable() {
  return true
}

