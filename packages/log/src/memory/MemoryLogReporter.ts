import { LogEntry, LogFormatter, LogReporter, LogReporterOptions } from 'standard-log-core';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[]
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function createMemoryLogReporter(options: LogReporterOptions<LogEntry> = {}): MemoryLogReporter {
  return {
    id: options.id || 'memory',
    logs: [],
    write(entry) {
      if (options.filter && !options.filter(entry)) return
      this.logs.push(options.formatter ? options.formatter(entry) : entry)
    }
  }
}
