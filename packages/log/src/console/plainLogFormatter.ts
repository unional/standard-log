import { LogEntry } from '../types';
import { toLogLevelDisplay } from './toLogLevelDisplay';

export function plainLogFormatter({ id, level, args, timestamp }: LogEntry) {
  return [timestamp.toISOString(), id, toLogLevelDisplay(level), ...args]
}
