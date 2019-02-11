import { logLevel, LogWriter, toLogLevelName } from 'standard-log-core';
import uppercase from 'upper-case';

export type ConsoleLogWriter = {
} & LogWriter

export function createConsoleLogWriter(): ConsoleLogWriter {
  return {
    console: console,
    write({ id }: { id: string }, level: number, messages: any[]) {
      const method = toConsoleMethod(level)
      this.console[method](id, `(${uppercase(toLogLevelName(level))})`, ...messages)
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
