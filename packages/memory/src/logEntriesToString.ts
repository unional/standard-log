import { LogEntry, plainLogFormatter } from 'standard-log';

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainLogFormatter).join('\n')
}
