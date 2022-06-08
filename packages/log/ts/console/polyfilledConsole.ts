/* istanbul ignore file */
import { isConsoleDebugAvailable } from '../platform/index.js'
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
