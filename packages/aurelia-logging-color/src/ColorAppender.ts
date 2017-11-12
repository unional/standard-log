import { Logger } from 'aurelia-logging'

import { BrushOption, Brush, ColorModeOption } from './interfaces'
import { createBrush } from './createBrush'
import { isNode } from './environments'

export interface ColorAppenderOption extends BrushOption, ColorModeOption {
}

/**
 * A colored console log.
 * Color only apply to Chrome, Firefox, and NodeJS.
 * Other will behave like `ConsoleAppender`
 */
export class ColorAppender {
  private brush: Brush
  constructor(option?: ColorAppenderOption) {
    this.brush = createBrush(option)
  }
  error(logger: Logger, ...rest: any[]) {
    // the `typeof` guards against IE where `console.log.apply()`
    // results in error `Object doesn't support property or method 'apply'`
    // istanbul ignore next
    // tslint:disable-next-line
    if (typeof console.error === 'function')
      console.error.apply(console, this.brush.color(logger.id, ...rest))
  }
  warn(logger: Logger, ...rest: any[]) {
    // istanbul ignore next
    // tslint:disable-next-line
    if (typeof console.warn === 'function')
      console.warn.apply(console, this.brush.color(logger.id, ...rest))
  }
  info(logger: Logger, ...rest: any[]) {
    // istanbul ignore next
    // tslint:disable-next-line
    if (typeof console.info === 'function')
      console.info.apply(console, this.brush.color(logger.id, ...rest))
  }
  debug(logger: Logger, ...rest: any[]) {
    // Node@7 or below has `console.debug = undefined`
    // Should use `console.log()` in that case.
    // istanbul ignore next
    const method = isNode || !console.debug ? console.log : console.debug;
    // istanbul ignore next
    // tslint:disable-next-line
    if (typeof method === 'function') {
      method.apply(console, this.brush.color(logger.id, ...rest))
    }
  }
}
