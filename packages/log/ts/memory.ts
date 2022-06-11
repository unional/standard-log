import { required } from 'type-plus'
import { toInspectLogEntry } from './platform.js'
import { formatLogLevel } from './reporter.js'
import type { LogEntry, LogFormatter, LogReporter, LogReporterOptions } from './types.js'

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[],
  /**
   * Gets a simple log message for testing.
   * The message only contains arguments for each log entry.
   */
  getLogMessage(): string,
  getLogMessageWithLevel(): string
}

export type MemoryLogFormatter = LogFormatter<LogEntry>

export function toMessageWithLevel(logs: LogEntry[]) {
  return logs.map(toInspectLogEntry)
    .map(log => `${formatLogLevel(log.level)} ${log.args.join(' ')}`)
    .join('\n')
    // if it has more than this log,
    // we assume it is running under tests,
    // and remove this log to simplify testing.
    .replace(/^\(WARN\) already configured for test, ignoring config\(\) call\n/, '')
}

export function createMemoryLogReporter(options?: LogReporterOptions<LogEntry>): MemoryLogReporter {
  const { id, formatter, filter } = required({ id: 'memory', formatter: (e: LogEntry) => e }, options)
  const logs: LogEntry[] = []
  return Object.freeze({
    id,
    get formatter() { return formatter },
    get filter() { return filter },
    logs,
    write(entry: LogEntry) {
      if (filter && !filter(entry)) return
      logs.push(formatter(entry))
    },
    getLogMessage() {
      return logs.map(toInspectLogEntry)
        .map(log => log.args.join(' '))
        .join('\n')
    },
    getLogMessageWithLevel() { return toMessageWithLevel(logs) }
  })
}
