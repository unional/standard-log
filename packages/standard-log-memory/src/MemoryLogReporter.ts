import { LogEntry, LogReporter } from 'standard-log-core';

export type MemoryLogReporter = LogReporter<never> & {
  logs: LogEntry[]
}

export function createMemoryLogReporter(): MemoryLogReporter {
  return {
    logs: [] as LogEntry[],
    write(entry) {
      this.logs.push(entry)
    }
  }
}
