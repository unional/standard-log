import { LogEntry, LogFormatter, LogReporter, LogReporterOptions, plainFormatter } from 'standard-log-core';
import { required } from 'type-plus';
import { createAnsiFormatter } from './ansi';
import { createCssFormatter } from './css';
import { polyfilledConsole } from './polyfilledConsole';
import { isBrowser, supportColor, toConsoleMethod } from './utils';

export type ConsoleLogReporter = LogReporter<any[]>
export type ConsoleLogFormatter = LogFormatter<any[]>
export type ConsoleLogReporterOptions = LogReporterOptions<any[]>

export function createConsoleLogReporter(options?: ConsoleLogReporterOptions) {
  const { id, formatter, filter } = required({ id: 'console', formatter: getFormatter() }, options)
  return {
    id,
    formatter,
    console: polyfilledConsole,
    write(entry: LogEntry) {
      if (filter && !filter(entry)) return
      const values = (this.formatter || formatter)(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  } as LogReporter<any[]> & { console: typeof polyfilledConsole }
}

function getFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainFormatter

  // istanbul ignore next
  return isBrowser() ? createCssFormatter() : createAnsiFormatter()
}
