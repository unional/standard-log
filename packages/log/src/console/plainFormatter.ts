import { LogEntry } from '../types';
import { toLogLevelDisplay } from './toLogLevelDisplay';

export function plainFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, toLogLevelDisplay(level), ...args]
}
