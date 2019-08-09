import { LogEntry, LogFormatter, LogReporter, LogReporterOptions, LogFilter } from '../types';
import { required } from 'type-plus';
import { assertLogModeIsNotProduction } from '../utils';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[]
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function createMemoryLogReporter(options?: LogReporterOptions<LogEntry>): MemoryLogReporter {
  let { id, formatter, filter } = required({ id: 'memory', formatter: (e: LogEntry) => e }, options)
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
    }
  }
}
