import type { ConsoleLogReporterOptions, TimestampFormat } from 'standard-log'

export type CssFormatterOptions = {
	/**
	 * How many colors available.
	 * Recommend at least 10.
	 * Default to 20.
	 */
	maxColor?: number
  /**
   * Style of the timestamp.
   * Defaults to `none`.
   *
   * - `none`: no timestamp.
   * - `iso`: in iso format.
   * - `long`: as elapsed time.
   */
	timestamp?: TimestampFormat
	/**
	 * style of the id block.
	 * Defaults to `padding: 2px; line-height: 1rem;`
	 */
	style?: string
}

export type ColorLogReporterOptions = ConsoleLogReporterOptions & {
	/**
	 * CSS formatter options.
	 * This can be used to specify the CSS formatter options in the browser,
	 * If you do not specify your own `formatter`.
	 */
	cssFormatterOptions?: CssFormatterOptions
}
