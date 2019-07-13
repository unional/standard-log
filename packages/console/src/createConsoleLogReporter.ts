import { LogEntry, LogFilter, LogFormatter, LogReporter, plainFormatter } from 'standard-log-core';
import { getField } from 'type-plus';
import { createAnsiFormatter } from './ansi';
import { createCssFormatter } from './css';
import { polyfilledConsole } from './polyfilledConsole';
import { isBrowser, supportColor, toConsoleMethod } from './utils';

export type ConsoleLogReporter = LogReporter<any[]>

export type ConsoleLogFormatter = LogFormatter<any[]>

export type ConsoleLogReporterOptions = {
  id?: string,
  formatter?: ConsoleLogFormatter,
  filter?: LogFilter
}

export function createConsoleLogReporter(options: ConsoleLogReporterOptions = {}) {
  const id = getField(options, 'id', 'console')
  const formatter = options.formatter || getFormatter()
  return {
    id,
    formatter,
    filter: options.filter,
    console: polyfilledConsole,
    write(entry: LogEntry) {
      if (this.filter && !this.filter(entry)) return
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
