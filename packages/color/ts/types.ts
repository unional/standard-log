import type { ConsoleLogReporterOptions, TimestampFormat } from 'standard-log'

export type CssFormatterOptions = {
  /**
   * How many colors available.
   * Recommend at least 10.
   * Default to 20.
   */
  maxColor?: number,
  timestamp?: TimestampFormat,
  /**
   * style of the id block.
   * Defaults to `padding: 2px; margin: 2px; line-height: 1.8em;`
   */
  style?: string
}

export type ColorLogReporterOptions = ConsoleLogReporterOptions & {
  /**
   * CSS formatter options.
   * This can be used to specify the CSS formatter options in the browser,
   * IF you do not specify your own `formatter`.
   */
  cssFormatterOptions?: CssFormatterOptions
}
