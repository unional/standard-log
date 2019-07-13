import { LogEntry, LogReporter } from 'standard-log-core';

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[]
}

export function createMemoryLogReporter(): MemoryLogReporter {
  return {
    id: 'memory',
    logs: [] as LogEntry[],
    write(entry) {
      this.logs.push(entry)
    }
  }
}
