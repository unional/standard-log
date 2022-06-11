import type { LogEntry } from '../types.js'

export const toInspectLogEntry = (e: LogEntry) => e
export function isConsoleDebugAvailable() {
  return true
}

declare const StandardLogColor: any

export function createColorLogReporter() {
  return StandardLogColor.createColorLogReporter()
}
