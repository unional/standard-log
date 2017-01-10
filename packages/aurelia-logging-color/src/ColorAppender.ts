import { Logger } from 'aurelia-logging'

import { BrushOption, Brush } from './interfaces'
import { createBrush } from './createBrush'

export interface ColorAppenderOption extends BrushOption { }

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
    console.error.apply(console, this.brush.color(logger.id, ...rest))
  }
  warn(logger: Logger, ...rest: any[]) {
    console.warn.apply(console, this.brush.color(logger.id, ...rest))
  }
  info(logger: Logger, ...rest: any[]) {
    console.info.apply(console, this.brush.color(logger.id, ...rest))
  }
  debug(logger: Logger, ...rest: any[]) {
    (console.debug || console.log).apply(console, this.brush.color(logger.id, ...rest))
  }
}
