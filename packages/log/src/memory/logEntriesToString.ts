import { plainLogFormatter } from '../formatter';
import { LogEntry } from '../types';

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainLogFormatter).join('\n')
}
