import { toLogLevelDisplay } from './logLevel';
import { LogEntry } from './types';

export function plainFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, toLogLevelDisplay(level), ...args]
}
