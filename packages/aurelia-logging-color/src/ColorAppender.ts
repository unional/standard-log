import { Logger } from 'aurelia-logging'

import { BrushOption, Brush, ColorMode } from './interfaces'
import { createBrush } from './createBrush'

export interface ColorAppenderOption extends BrushOption {
  /**
   * Choose which color mode to use.
   * For browser usage, you should choose 'CSS',
   * For NodeJS, you should choose 'ANSI'
   * For NodeJS with no support of Windows, you can choose 'ANSI16M'
   * Choose 'NONE' if you want to disable color.
   */
  colorMode: ColorMode
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
    (console.debug || console.log).apply(console, this.brush.color(logger.id, ...rest))
  }
}
