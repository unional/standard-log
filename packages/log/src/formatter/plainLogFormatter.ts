import { LogEntry, toLogLevelDisplay } from 'standard-log-core';

export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, toLogLevelDisplay(level), ...args]
}
