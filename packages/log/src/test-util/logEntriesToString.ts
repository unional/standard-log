import { plainFormatter } from '../console';
import { LogEntry } from '../types';

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(plainFormatter).join('\n')
}
