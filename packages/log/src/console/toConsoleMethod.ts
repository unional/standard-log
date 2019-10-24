import { logLevels } from '../logLevel';

export function toConsoleMethod(level: number) {
  switch (true) {
    // istanbul ignore next
    case (level === 0):
      // edge case in case none is somehow written
      return 'debug'
    case (level <= logLevels.error):
      return 'error'
    case (level <= logLevels.warn):
      return 'warn'
    case (level <= logLevels.info):
      return 'info'
    default:
      return 'debug'
  }
}
