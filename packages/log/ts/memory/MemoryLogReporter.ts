import { required } from 'type-plus'
import { formatLogLevel } from '../formatter/index.js'
import { LogEntry, LogFilter, LogFormatter, LogReporter, LogReporterOptions } from '../types.js'
import { assertLogModeIsNotProduction } from '../utils.js'
import { toInspectLogEntry } from './toInspectStringForObject.js'

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

function createGetLogMessage() {
  return function getLogMessage(this: { logs: LogEntry[] }) {
    return this.logs.map(toInspectLogEntry)
      .map(log => log.args.join(' '))
      .join('\n')
  }
}

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
  const opt = required({ id: 'memory', formatter: (e: LogEntry) => e }, options)
  const { id } = opt
  let { formatter, filter } = opt
  return {
    id,
    get formatter() {
      return formatter
    },
    set formatter(value: MemoryLogFormatter) {
      assertLogModeIsNotProduction('set Reporter.formatter')
      formatter = value
    },
    get filter() {
      return filter
    },
    set filter(value: LogFilter) {
      assertLogModeIsNotProduction('set Reporter.filter')
      filter = value
    },
    logs: [],
    write(entry) {
      if (filter && !filter(entry)) return
      this.logs.push(formatter(entry))
    },
    getLogMessage: createGetLogMessage(),
    getLogMessageWithLevel() { return toMessageWithLevel(this.logs) }
  }
}
