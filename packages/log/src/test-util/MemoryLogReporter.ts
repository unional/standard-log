import { LogEntry, LogFormatter, LogReporter, LogReporterOptions } from '../types';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[]
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function createMemoryLogReporter(options: Pick<LogReporterOptions, 'formatter'> = {}): MemoryLogReporter {
  return {
    id: 'memory',
    logs: [] as LogEntry[],
    write(entry) {
      this.logs.push(options.formatter ? options.formatter(entry) : entry)
    }
  }
}
