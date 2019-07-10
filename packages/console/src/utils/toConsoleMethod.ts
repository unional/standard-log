import { logLevel } from 'standard-log-core';

export function toConsoleMethod(level: number) {
  switch (true) {
    case (level === 0):
      // edge case in case none is somehow written
      // istanbul ignore next
      return 'debug'
    case (level <= logLevel.error):
      return 'error'
    case (level <= logLevel.warn):
      return 'warn'
    case (level <= logLevel.info):
      return 'info'
    default:
      return 'debug'
  }
}
