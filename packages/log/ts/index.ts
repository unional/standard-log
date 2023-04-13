export * from './console.js'
export * from './errors.js'
export * from './formatter.js'
export * from './log_levels.js'
export * from './memory.js'
export { configGlobal, createStandardLog, getLogger, suppressLogs } from './standard_log.js'
export type { GetLogger, StandardLog } from './standard_log.js'
export type {
	ConsoleLike,
	LogEntry,
	LogFilter,
	LogFormatter,
	LogFunction,
	LogLevel,
	LogLevelEntry,
	LogMethod,
	LogMethodNames,
	LogReporter,
	LogReporterOptions,
	Logger,
	LoggerOptions,
	ReporterFilter,
	StandardLogInstance,
	StandardLogOptions
} from './types.js'
