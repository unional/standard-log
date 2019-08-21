import { isConsoleDebugAvailable } from './isConsoleDebugAvailable';

// Node@9.3 or below has `console.debug = undefined` or it doesn't log
// Should use `console.log()` in those case.
// istanbul ignore next
/* eslint-disable no-console */
const debug = (isConsoleDebugAvailable() ? console.debug : console.log).bind(console)
// the `typeof` guards against IE where `console.log.apply()`
// results in error `Object doesn't support property or method 'apply'`
// istanbul ignore next
const info = (typeof console.info === 'function' ? console.info : console.log).bind(console)
// istanbul ignore next
const warn = (typeof console.warn === 'function' ? console.warn : console.log).bind(console)
// istanbul ignore next
const error = (typeof console.error === 'function' ? console.error : console.log).bind(console)
/* eslint-enable no-console */

export const polyfilledConsole = {
  debug,
  info,
  warn,
  error
}
