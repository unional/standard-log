import uppercase from 'upper-case'
import { toLogLevelName } from 'standard-log-core';

export function formatLogLevel(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
