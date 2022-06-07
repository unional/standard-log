import { required } from 'type-plus'
import { plainLogFormatter } from '../formatter/index.js'
import { LogFormatter, LogReporter, LogReporterOptions, LogFilter } from '../types.js'
import { assertLogModeIsNotProduction } from '../utils.js'
import { polyfilledConsole } from './polyfilledConsole.js'
import { toConsoleMethod } from './toConsoleMethod.js'
import { Console } from './types.js'

export type ConsoleLogReporter = LogReporter<any[]> & { console: Console }
export type ConsoleLogFormatter = LogFormatter<any[]>
export type ConsoleLogReporterOptions = LogReporterOptions<any[]>

export function createConsoleLogReporter(options?: ConsoleLogReporterOptions): ConsoleLogReporter {
  const opts = required({ id: 'console', formatter: plainLogFormatter }, options)
  const { id } = opts
  let { formatter, filter } = opts
  return {
    id,
    isConsoleReporter: true,
    get formatter() {
      return formatter
    },
    set formatter(value: ConsoleLogFormatter) {
      assertLogModeIsNotProduction(
        'set Reporter.formatter',
        Object.getOwnPropertyDescriptor(this, 'formatter')!.set!
      )
      formatter = value
    },
    get filter() {
      return filter
    },
    set filter(value: LogFilter) {
      assertLogModeIsNotProduction(
        'set Reporter.filter',
        Object.getOwnPropertyDescriptor(this, 'filter')!.set!
      )
      filter = value
    },
    console: polyfilledConsole,
    write(entry) {
      if (filter && !filter(entry)) return
      const values = formatter(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  }
}
