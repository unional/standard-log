import { LogEntry, toLogLevelName } from 'standard-log-core';
import uppercase from 'upper-case';

export function plainFormatter({ loggerId, level, messages, timestamp }: LogEntry) {
  return [loggerId, `(${uppercase(toLogLevelName(level))})`, ...messages, timestamp]
}
