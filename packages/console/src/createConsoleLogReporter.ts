import { LogEntry, logLevel, LogReporter, toLogLevelName } from 'standard-log-core';
import uppercase from 'upper-case';

export type ConsoleLogReporter = LogReporter<string>

export function createConsoleLogReporter({ id } = { id: 'console' }): ConsoleLogReporter {
  return {
    id,
    console: console,
    write({ loggerId, level, messages, timestamp }: LogEntry) {
      const method = toConsoleMethod(level)
      this.console[method](loggerId, `(${uppercase(toLogLevelName(level))})`, ...messages, timestamp)
    }
  } as any
}

function toConsoleMethod(level: number) {
  switch (true) {
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
