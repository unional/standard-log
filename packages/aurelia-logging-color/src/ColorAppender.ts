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
    console.error.apply(console, this.brush.color(logger.id, ...rest))
  }
  warn(logger: Logger, ...rest: any[]) {
    console.warn.apply(console, this.brush.color(logger.id, ...rest))
  }
  info(logger: Logger, ...rest: any[]) {
    console.info.apply(console, this.brush.color(logger.id, ...rest))
  }
  debug(logger: Logger, ...rest: any[]) {
    const method = isNode || !console.debug ? console.log : console.debug;
    method.apply(console, this.brush.color(logger.id, ...rest))
  }
}
