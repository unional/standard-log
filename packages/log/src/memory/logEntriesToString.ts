import { LogEntry } from 'standard-log-core';
import { plainLogFormatter } from '../formatter';

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainLogFormatter).join('\n')
}
