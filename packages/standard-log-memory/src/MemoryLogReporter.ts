import { LogEntry, LogReporter } from 'standard-log-core';

export type MemoryLogReporter = LogReporter<never> & {
  logs: LogEntry[]
}

export function createMemoryLogReporter({ id } = { id: 'memory' }): MemoryLogReporter {
  return {
    id,
    logs: [] as LogEntry[],
    write(entry) {
      this.logs.push(entry)
    }
  }
}
