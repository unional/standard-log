import { LogEntry, plainFormatter } from 'standard-log';

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainFormatter).join('\n')
}
