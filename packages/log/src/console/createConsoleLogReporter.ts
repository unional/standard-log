import { LogFormatter, LogReporter, LogReporterOptions } from 'standard-log-core';
import { required } from 'type-plus';
import { polyfilledConsole } from './polyfilledConsole';
import { toConsoleMethod } from './toConsoleMethod';
import { Console } from './types';
import { plainLogFormatter } from '../formatter';

export type ConsoleLogReporter = LogReporter<any[]> & { console: Console }
export type ConsoleLogFormatter = LogFormatter<any[]>
export type ConsoleLogReporterOptions = LogReporterOptions<any[]>

export function createConsoleLogReporter(options?: ConsoleLogReporterOptions) {
  const { id, formatter, filter } = required({ id: 'console', formatter: plainLogFormatter }, options)
  return {
    id,
    formatter,
    console: polyfilledConsole,
    write(entry) {
      if (filter && !filter(entry)) return
      const values = (this.formatter || formatter)(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  } as ConsoleLogReporter
}
