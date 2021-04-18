import { required } from 'type-plus'
import { plainLogFormatter } from '../formatter'
import { LogFormatter, LogReporter, LogReporterOptions, LogFilter } from '../types'
import { assertLogModeIsNotProduction } from '../utils'
import { polyfilledConsole } from './polyfilledConsole'
import { toConsoleMethod } from './toConsoleMethod'
import { Console } from './types'

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
    console: polyfilledConsole,
    write(entry) {
      if (filter && !filter(entry)) return
      const values = formatter(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  }
}
