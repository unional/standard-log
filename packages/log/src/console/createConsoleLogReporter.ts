import { required } from 'type-plus';
import { plainLogFormatter } from '../formatter';
import { LogFormatter, LogReporter, LogReporterOptions } from '../types';
import { polyfilledConsole } from './polyfilledConsole';
import { toConsoleMethod } from './toConsoleMethod';
import { Console } from './types';

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
