import { toLogLevelName } from 'standard-log-core';
import uppercase from 'upper-case';

export function toLogLevelDisplay(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
