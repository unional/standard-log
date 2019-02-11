import { LogWriter } from 'standard-log-core';
import { LogEntry } from './LogEntry';

export type MemoryLogWriter = {
  logs: LogEntry[]
} & LogWriter

export function createMemoryLogWriter(): MemoryLogWriter {
  return {
    logs: [] as LogEntry[],
    write({ id }, level, messages) {
      this.logs.push({ id, level, messages })
    }
  }
}
