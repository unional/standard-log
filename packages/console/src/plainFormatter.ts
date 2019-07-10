import { LogEntry } from 'standard-log-core';
import { toLogLevelDisplay } from './utils';

export function plainFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, toLogLevelDisplay(level), ...args]
}
