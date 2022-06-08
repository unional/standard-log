import { logLevels } from '../logLevel.js'
import { isConsoleDebugAvailable } from '../platform/index.js'
import { required } from 'type-plus'
import { plainLogFormatter } from '../formatter/index.js'
import type { LogFilter, LogFormatter, LogReporter, LogReporterOptions } from '../types.js'
import { assertLogModeIsNotProduction } from '../utils.js'

export function toConsoleMethod(level: number) {
  switch (true) {
    // istanbul ignore next
    case (level === 0):
      // edge case in case none is somehow written
      return 'debug'
    case (level <= logLevels.error):
      return 'error'
    case (level <= logLevels.warn):
      return 'warn'
    case (level <= logLevels.info):
      return 'info'
    default:
      return 'debug'
  }
}

/* eslint-disable no-console */
function buildPolyfillConsole() {
  // old phantomjs does not have bind function
  const hasBind = !!console.log.bind as boolean
  if (hasBind) {
    return {
      // Node@9.3 or below has `console.debug = undefined` or it doesn't log
      // Should use `console.log()` in those case.
      debug: (isConsoleDebugAvailable() ? console.debug : console.log).bind(console),
      // the `typeof` guards against IE where `console.log.apply()`
      // results in error `Object doesn't support property or method 'apply'`
      info: (typeof console.info === 'function' ? console.info : console.log).bind(console),
      warn: (typeof console.warn === 'function' ? console.warn : console.log).bind(console),
      error: (typeof console.error === 'function' ? console.error : console.log).bind(console)
    }
  }
  else {
    return {
      debug: buildFn(isConsoleDebugAvailable() ? 'debug' : 'log'),
      info: buildFn(typeof console.info === 'function' ? 'info' : 'log'),
      warn: buildFn(typeof console.warn === 'function' ? 'warn' : 'log'),
      error: buildFn(typeof console.error === 'function' ? 'error' : 'log'),
    }
  }
}

function buildFn(name: 'debug' | 'info' | 'warn' | 'error' | 'log') {
  return function (...args: any[]) { console[name](...args) }
}

export const polyfilledConsole = buildPolyfillConsole()

export type Console = typeof polyfilledConsole

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
