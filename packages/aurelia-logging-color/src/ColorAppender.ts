import { Logger } from 'aurelia-logging'

import { BrushOption, Brush } from './interfaces'
import { createBrush } from './Brush'

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
    console.error(this.brush.paint(` ${logger.id} `), ...rest)
  }
  warn(logger: Logger, ...rest: any[]) {
    console.warn(this.brush.paint(` ${logger.id} `), ...rest)
  }
  info(logger: Logger, ...rest: any[]) {
    console.info(this.brush.paint(` ${logger.id} `), ...rest)
  }
  debug(logger: Logger, ...rest: any[]) {
    (console.debug || console.log)(this.brush.paint(` ${logger.id} `), ...rest)
  }
}
