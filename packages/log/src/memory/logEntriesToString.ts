import { LogEntry, plainFormatter } from 'standard-log-core'
export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainFormatter).join('\n')
}
