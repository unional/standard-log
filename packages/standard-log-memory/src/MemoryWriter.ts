import { getLogLevel, LogLevel, LogWriter } from 'standard-log-core';

export type MemoryWriter<T extends string> = {
  logs: LogEntry[]
} & LogWriter<T>

export type LogEntry = {
  id: string
  level: number
  messages: any[]
}

export function createMemoryWriter<T extends string = LogLevel>(): MemoryWriter<T> {
  return new Proxy({ logs: [] as LogEntry[] }, {
    get(target, prop) {
      if (prop === 'logs') return target.logs
      if (typeof prop === 'string') {
        const level = getLogLevel(prop)
        if (level) {
          return ({ id }: { id: string }, messages: any[]) => {
            target.logs.push({ id, level, messages })
          }
        }
      }
    }
  }) as any
}
