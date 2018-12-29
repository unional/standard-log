import { Logger, logLevel } from 'aurelia-logging'

import { BrushOption, Brush, ColorModeOption } from './interfaces'
import { createBrush } from './createBrush'
import { isNode } from './environments'

export interface ColorAppenderOption extends BrushOption, ColorModeOption {
}

// Node@9.3 or below has `console.debug = undefined` or it doesn't log
// Should use `console.log()` in those case.
// tslint:disable-next-line
// istanbul ignore next
const debug = isNode && nodeVersionBelow(9, 3) ? console.log : console.debug
// the `typeof` guards against IE where `console.log.apply()`
// results in error `Object doesn't support property or method 'apply'`
// istanbul ignore next
// tslint:disable-next-line
const info = typeof console.info === 'function' ? console.info : console.log
// istanbul ignore next
// tslint:disable-next-line
const warn = typeof console.warn === 'function' ? console.warn : console.log
// istanbul ignore next
// tslint:disable-next-line
const error = typeof console.warn === 'function' ? console.warn : console.log

function getLogMethod(level: number) {
  if (level >= logLevel.debug) return debug
  if (level >= logLevel.info) return info
  if (level >= logLevel.warn) return warn
  if (level >= logLevel.error) return error
}

// istanbul ignore next
function nodeVersionBelow(major: number, minor = 0, patch = 0) {
  // without this, systemjs will complain `process is not defined`
  if (!global.process)
    return false
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  const [actualMajor, actualMinor, actualPatch] = versionString.split('.').map(s => parseInt(s, 10))
  const checking = major * 1000 * 1000 + minor * 1000 + patch
  const actual = actualMajor * 1000 * 1000 + actualMinor * 1000 + actualPatch
  return checking >= actual
}

/**
 * A colored console log.
 * Color only apply to Chrome, Firefox, and NodeJS.
 * Other will behave like `ConsoleAppender`
 */
export class ColorAppender {
  static addCustomLevel(name: string, level: number) {
    ColorAppender.prototype[name] = function (logger: Logger, ...rest: any[]) {
      const logMethod = getLogMethod(level)
      if (logMethod)
        logMethod.apply(console, this.brush.color(logger.id, ...rest))
    }
  }
  private brush: Brush
  constructor(option?: ColorAppenderOption) {
    this.brush = createBrush(option)
  }
  error(logger: Logger, ...rest: any[]) {
    error.apply(console, this.brush.color(logger.id, ...rest))
  }
  warn(logger: Logger, ...rest: any[]) {
    warn.apply(console, this.brush.color(logger.id, ...rest))
  }
  info(logger: Logger, ...rest: any[]) {
    info.apply(console, this.brush.color(logger.id, ...rest))
  }
  debug(logger: Logger, ...rest: any[]) {
    debug.apply(console, this.brush.color(logger.id, ...rest))
  }
}
