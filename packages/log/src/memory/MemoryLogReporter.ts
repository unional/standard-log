import { LogEntry, LogFormatter, LogReporter, LogReporterOptions, LogFilter } from '../types';
import { required } from 'type-plus';
import { assertLogModeIsNotProduction } from '../utils';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[],
  /**
   * Gets a simple log message for testing.
   * The message only contains arguments for each log entry.
   */
  getLogMessage(): string
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function createMemoryLogReporter(options?: LogReporterOptions<LogEntry>): MemoryLogReporter {
  const opt = required({ id: 'memory', formatter: (e: LogEntry) => e }, options)
  const { id } = opt
  let { formatter, filter } = opt
  return {
    id,
    get formatter() {
      return formatter
    },
    set formatter(value: MemoryLogFormatter) {
      assertLogModeIsNotProduction('set Reporter.formatter')
      formatter = value
    },
    get filter() {
      return filter
    },
    set filter(value: LogFilter) {
      assertLogModeIsNotProduction('set Reporter.filter')
      filter = value
    },
    logs: [],
    write(entry) {
      if (filter && !filter(entry)) return
      this.logs.push(formatter(entry))
    },
    getLogMessage() {
      return this.logs.map(log => log.args.join(' ')).join('\n')
    }
  }
}
