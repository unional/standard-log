import { Logger } from 'aurelia-logging'

import { Palette, PaletteOption } from './Palette'

export interface ColorAppenderOption extends PaletteOption {}
/**
 * A colored console log.
 * Color only apply to Chrome, Firefox, and NodeJS.
 * Other will behave like `ConsoleAppender`
 */
export class ColorAppender {
  private palette: Palette
  constructor(option?: ColorAppenderOption) {
    this.palette = new Palette(option)
  }
  error(logger: Logger, ...rest: any[]) {
    console.error(this.palette.color(` ${logger.id} `), ...rest)
  }
  warn(logger: Logger, ...rest: any[]) {
    console.warn(this.palette.color(` ${logger.id} `), ...rest)
  }
  info(logger: Logger, ...rest: any[]) {
    console.info(this.palette.color(` ${logger.id} `), ...rest)
  }
  debug(logger: Logger, ...rest: any[]) {
    (console.debug || console.log)(this.palette.color(` ${logger.id} `), ...rest)
  }
}
