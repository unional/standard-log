import { logLevel } from '../core';

export function toConsoleMethod(level: number) {
  switch (true) {
    // istanbul ignore next
    case (level === 0):
      // edge case in case none is somehow written
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
