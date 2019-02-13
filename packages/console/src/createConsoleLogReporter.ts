import { LogEntry, LogFormatter, logLevel, LogReporter } from 'standard-log-core';
import { plainFormatter } from './plainFormatter';
import { polyfilledConsole } from './polyfilledConsole';

export type ConsoleLogReporter = LogReporter<string[]>

export type ConsoleLogReporterOptions = {
  id: string,
  formatter: LogFormatter<string[]>
}

export function createConsoleLogReporter({ id, formatter }: Partial<ConsoleLogReporterOptions> = { id: 'console', formatter: plainFormatter }): ConsoleLogReporter {
  return {
    id,
    formatter,
    console: polyfilledConsole,
    write(entry: LogEntry) {
      const method = toConsoleMethod(entry.level)
      this.console[method](...this.formatter(entry))
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
