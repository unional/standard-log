import { unpartial } from 'type-plus'
import { plainLogFormatter } from './formatter.js'
import { logLevels } from './logLevels.js'
import { polyfill } from './platform.js'
import type { ConsoleLike, LogEntry, LogFormatter, LogReporter, LogReporterOptions } from './types.js'

export function toConsoleMethod(level: number) {
  switch (true) {
    // edge case in case none is somehow written
    case (level <= 0): return 'debug'
    case (level <= logLevels.error): return 'error'
    case (level <= logLevels.warn): return 'warn'
    case (level <= logLevels.info): return 'info'
    default: return 'debug'
  }
}

// istanbul ignore next
/* eslint-disable no-console */
function buildPolyfillConsole() {
  // old phantomjs does not have bind function
  const hasBind = !!console.log.bind as boolean
  if (hasBind) {
    return {
      // the `typeof` guards against IE where `console.log.apply()`
      // results in error `Object doesn't support property or method 'apply'`
      debug: (typeof console.info === 'function' ? console.debug : console.log).bind(console),
      info: (typeof console.info === 'function' ? console.info : console.log).bind(console),
      warn: (typeof console.warn === 'function' ? console.warn : console.log).bind(console),
      error: (typeof console.error === 'function' ? console.error : console.log).bind(console)
    }
  }
  else {
    return {
      debug: buildFn(typeof console.debug === 'function' ? 'debug' : 'log'),
      info: buildFn(typeof console.info === 'function' ? 'info' : 'log'),
      warn: buildFn(typeof console.warn === 'function' ? 'warn' : 'log'),
      error: buildFn(typeof console.error === 'function' ? 'error' : 'log'),
    }
  }
}

// istanbul ignore next
function buildFn(name: 'debug' | 'info' | 'warn' | 'error' | 'log') {
  return function (...args: any[]) { console[name](...args) }
}


export type ConsoleLogFormatter = LogFormatter<any[]>
export type ConsoleLogReporter = LogReporter<any[]> & { console: ConsoleLike }
export type ConsoleLogReporterOptions = LogReporterOptions<any[]>

export function createConsoleLogReporter(options?: ConsoleLogReporterOptions): ConsoleLogReporter {
  const { id, formatter, filter } = unpartial({ id: 'console', formatter: plainLogFormatter }, options)
  if (!polyfill.console) polyfill.console = buildPolyfillConsole()

  return Object.freeze({
    id,
    isConsoleReporter: true,
    get formatter() { return formatter },
    get filter() { return filter },
    console: polyfill.console,
    write(entry: LogEntry) {
      if (filter && !filter(entry)) return
      const values = formatter(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  })
}
