import type { StackTraceMeta } from '@just-func/types'

export type StandardLogOptions<CustomLevelNames extends string = LogMethodNames> = {
	/**
	 * A map of custom log levels.
	 *
	 * Each logger created will have a method for each custom level.
	 *
	 * ```ts
	 * import { createStandardLog } from 'standard-log'
	 *
	 * const sl = createStandardLog({ customLevels: { foo: 100 } })
	 * const logger = sl.getLogger('my-logger')
	 *
	 * logger.foo('Hello world!') // 2020-01-01T00:00:00.000Z my-logger (FOO) Hello world!
	 * ```
	 */
	customLevels?: Record<CustomLevelNames, number>
	logLevel?: number
	reporters?: LogReporter[]
}

export interface LoggerOptions extends StackTraceMeta {
	level?: number
	writeTo?: LogReporter | ReporterFilter
}

export type Logger<N extends string = LogMethodNames> = {
	readonly id: string
	/**
	 * Logger local log level.
	 */
	level?: number
	/**
	 * Logs with an increment counter.
	 * This is useful during debugging to check for steps executed.
	 */
	count(...args: any[]): void
	on(level: number | N, logFunction: LogFunction): void
	/**
	 * Write custom log entries.
	 */
	write(entry: LogEntry): void
} & { [k in N]: LogMethod }

/**
 * Names of the standard log methods.
 */
export type LogMethodNames =
	| 'emergency'
	| 'alert'
	| 'critical'
	| 'error'
	| 'warn'
	| 'notice'
	| 'info'
	| 'debug'
	| 'trace'
	| 'planck'

export type LogEntry = {
	id: string
	level: number
	// args instead of messages because it is `any[]` instead of `string[]`
	args: any[]
	timestamp: Date
}

export type LogMethod = (...args: any[]) => void

export type LogFunction = (log: LogMethod, logLevel: number) => string | void

export type ReporterFilter = string | RegExp | ((reporterId: string) => boolean)

export interface StandardLogInstance<N extends string = LogMethodNames> {
	/**
	 * The current log level.
	 */
	logLevel: number
	/**
	 * Convert log level number to log level name.
	 */
	toLogLevelName(level: number): string
	/**
	 * Convert log level name to log level number.
	 */
	toLogLevel(name: N): number
	/**
	 * Get a logger instance with the specified id.
	 *
	 * ```ts
	 * const logger = getLogger('my-logger')
	 *
	 * logger.info('Hello world!') // 2020-01-01T00:00:00.000Z my-logger (INFO) Hello world!
	 * ```
	 */
	getLogger(id: string, options?: LoggerOptions): Logger<N | LogMethodNames>
	/**
	 * Get a non-console logger instance with the specified id.
	 *
	 * The resulting logger will only send to the reporters that are not console reporters.
	 *
	 * ```ts
	 * const logger = getNonConsoleLogger('my-logger')
	 *
	 * logger.info('Hello world!') // will not send to any console reporter
	 * ```
	 */
	getNonConsoleLogger(id: string, options?: LoggerOptions): Logger<N | LogMethodNames>
}

/**
 * Formats a log entry.
 * Depends on the reporter, it can expect a different return type.
 * By default the return type is `any[]` which the `console` accepts.
 */
export type LogFormatter<T = any[]> = (entry: LogEntry) => T

/**
 * Determines whether the entry should be written.
 */
export type LogFilter = (entry: LogEntry) => boolean

export type LogLevelEntry = { name: string; level: number }

export interface LogReporter<T = any> {
	readonly id: string
	/**
	 * Specifies the formatter to be used by the reporter.
	 * Using this you can customize how the reporter writes the log entry.
	 */
	readonly formatter: LogFormatter<T>
	/**
	 * Specifies a filter to determine should the log be written.
	 */
	readonly filter?: LogFilter
	/**
	 * Indicates if this is a console reporter.
	 * There is only one console reporter can be present in the system.
	 */
	readonly isConsoleReporter?: boolean
	write(entry: LogEntry): void
}

export type LogReporterOptions<T = any> = {
	id?: string
	/**
	 * Specifies the formatter to be used by the reporter.
	 * Using this you can customize how the reporter writes the log entry.
	 */
	formatter?: LogFormatter<T>
	/**
	 * Specifies a filter to determine should the log be written.
	 */
	filter?: LogFilter
}

export type LogLevel = number

export interface ConsoleLike {
	debug(...args: any[]): void
	info(...args: any[]): void
	warn(...args: any[]): void
	error(...args: any[]): void
}
