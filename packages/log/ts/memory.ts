import { required, unpartial } from 'type-plus'
import { toInspectLogEntry } from './platform.js'
import { formatLogLevel } from './formatter.js'
import type { LogEntry, LogFormatter, LogReporter, LogReporterOptions } from './types.js'
import { createConsoleLogReporter } from './console.js'

export type MemoryLogReporter = LogReporter<LogEntry> & {
  logs: LogEntry[],
  /**
   * Gets a simple log message for testing.
   * The message only contains arguments for each log entry.
   */
  getLogMessage(): string,
  getLogMessages(): string[],
  getLogMessageWithLevel(): string,
  getLogMessagesWithIdAndLevel(): string[],
  emit(): void
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
  return Object.freeze(buildMemoryReporter(unpartial({ id: 'memory' }, options)))
}

function buildMemoryReporter(options?: LogReporterOptions<LogEntry>) {
  const { id, formatter, filter } = required({ id: 'memory', formatter: (e: LogEntry) => e }, options)
  const logs: LogEntry[] = []
  return {
    id,
    get formatter() { return formatter },
    get filter() { return filter },
    logs,
    write(entry: LogEntry) {
      if (filter && !filter(entry)) return
      logs.push(formatter(entry))
    },
    getLogMessage() {
      return this.getLogMessages().join('\n')
    },
    getLogMessages() {
      return logs.map(toInspectLogEntry)
        .map(log => log.args.join(' '))
    },
    getLogMessagesWithIdAndLevel() {
      return logs.map(toInspectLogEntry)
        .map(log => `${log.id} ${formatLogLevel(log.level)} ${log.args.join(' ')}`)
    },
    getLogMessageWithLevel() { return toMessageWithLevel(logs) },
    /**
     * emit the saved log to console for easy debugging
     */
    emit() {
      const reporter = createConsoleLogReporter()
      logs.forEach(l => reporter.write(l))
    }
  }
}

export function createMemoryWithConsoleLogReporter(options?: LogReporterOptions<LogEntry>): MemoryLogReporter {
  return Object.freeze(
    Object.assign(buildMemoryReporter(unpartial({ id: 'memory-with-console' }, options)), {
      isConsoleReporter: true
    }))
}
