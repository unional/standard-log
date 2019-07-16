import { LogEntry, LogFormatter, LogReporter, LogReporterOptions } from 'standard-log';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[]
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function createMemoryLogReporter(options: LogReporterOptions<LogEntry> = {}): MemoryLogReporter {
  return {
    id: options.id || 'memory',
    logs: [] as LogEntry[],
    write(entry) {
      this.logs.push(options.formatter ? options.formatter(entry) : entry)
    }
  }
}
