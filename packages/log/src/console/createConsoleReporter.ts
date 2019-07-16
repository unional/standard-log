import { required } from 'type-plus';
import { LogFormatter, LogReporter, LogReporterOptions } from '../types';
import { plainFormatter } from './plainFormatter';
import { polyfilledConsole } from './polyfilledConsole';
import { toConsoleMethod } from './toConsoleMethod';
import { Console } from './types';

export type ConsoleReporter = LogReporter<any[]> & { console: Console }
export type ConsoleFormatter = LogFormatter<any[]>
export type ConsoleReporterOptions = LogReporterOptions<any[]>

export function createConsoleReporter(options?: ConsoleReporterOptions) {
  const { id, formatter, filter } = required({ id: 'plain', formatter: plainFormatter }, options)
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
  } as ConsoleReporter
}
