import { record, required } from 'type-plus'
import { createLogger } from './logger.js'
import { DEFAULT_LOG_METHOD_NAMES, logLevels } from './logLevels.js'
import { createLogStore, LogStore } from './logStore.js'
import { createMemoryLogReporter, MemoryLogReporter } from './memory.js'
import { ctx } from './standardLog.ctx.js'
import type {
	Logger,
	LoggerOptions,
	LogLevel,
	LogMethodNames,
	StandardLogInstance,
	StandardLogOptions
} from './types.js'

export interface StandardLog<N extends string = LogMethodNames> extends Readonly<StandardLogInstance<N>> {}

export function createStandardLog<N extends string = LogMethodNames>(
	options?: StandardLogOptions<N>
): StandardLog<N> {
	const closure = createStandardLogClosure(options)
	if (options?.reporters?.some(r => !r.id)) {
		const log = closure.standardLog.getLogger('standard-log')
		log.critical(
			`Detected reporter with empty id. This is not allowed as it will create problems with feature like 'getNonConsoleLogger()'. Please add an id to your reporter.`
		)
	}

	if (!ctx.gsl) ctx.gsl = closure as any
	return closure.standardLog
}

function noop() {}

export function createStandardLogClosure<N extends string = LogMethodNames>(
	options?: StandardLogOptions<N>
): { store: LogStore; standardLog: StandardLog<N> } {
	// TODO reporter.id must not be empty
	const store = createLogStore(required({ logLevel: logLevels.info }, options))
	const nonConsoleReporters = options?.reporters?.filter(r => !r.isConsoleReporter).map(r => r.id) ?? []
	const logMethods = DEFAULT_LOG_METHOD_NAMES.concat(Object.keys(options?.customLevels ?? {})).concat([
		'on',
		'count',
		'write'
	])
	return {
		store,
		standardLog: {
			get logLevel() {
				return store.logLevel
			},

			toLogLevelName(level: number) {
				return store.logLevelStore.getName(level)
			},
			toLogLevel(name: string) {
				return store.logLevelStore.getLevel(name)
			},
			getLogger(id: string, options?: LoggerOptions) {
				if (store.loggers[id]) return store.loggers[id] as any
				return (store.loggers[id] = createLogger(store, id, { ssf: this.getLogger, ...options }) as any)
			},
			getNonConsoleLogger(id, options?) {
				if (store.nonConsoleLoggers[id]) return store.nonConsoleLoggers[id] as any

				if (store.loggers[id]) {
					const log = this.getLogger('standard-log')
					log.warn(`attempt to create a non-console logger with existing id ('${id}'), ignoring`)
					return (store.nonConsoleLoggers[id] = createDummyLogger(logMethods))
				}

				return (store.nonConsoleLoggers[id] =
					nonConsoleReporters.length === 0
						? createDummyLogger(logMethods)
						: createLogger(store, id, {
								ssf: this.getNonConsoleLogger,
								...options,
								writeTo(reporterId) {
									return nonConsoleReporters.indexOf(reporterId) >= 0
								}
						  }))
			}
		}
	}
}

function createDummyLogger(logMethods: string[]) {
	return logMethods.reduce((p, m) => {
		p[m] = noop
		return p
	}, record()) as Logger
}

export type StandardLogForTest<N extends string = LogMethodNames> = StandardLog<N> & {
	reporter: MemoryLogReporter
}

export function createStandardLogForTest<N extends string = LogMethodNames>(
	logLevel: LogLevel = logLevels.debug
): StandardLogForTest<N> {
	const reporter = createMemoryLogReporter()
	const closure = createStandardLogClosure<N>({ reporters: [reporter], logLevel })
	return { ...closure.standardLog, reporter }
}

/**
 * Suppress logging within the code block.
 */
export function suppressLogs<R>(block: () => R, log: Logger, ...logs: Logger[]): R
export function suppressLogs<R>(block: () => R, ...logs: Logger[]): R {
	const origLevels = logs.map(l => l.level)
	logs.forEach(l => (l.level = logLevels.none))
	const result = block()
	logs.forEach((l, i) => (l.level = origLevels[i]))
	return result
}

export type GetLogger<N extends string = LogMethodNames> = (
	id: string,
	options?: LoggerOptions
) => Logger<LogMethodNames | N>

export function getLogger<N extends string = LogMethodNames>(id: string, options?: LoggerOptions) {
	return getGlobalSL<N>().getLogger(id, options)
}

function getGlobalSL<N extends string = LogMethodNames>(): StandardLogInstance<N> {
	if (!ctx.gsl) ctx.gsl = createStandardLogClosure()

	return ctx.gsl!.standardLog as StandardLogInstance<N>
}

export function configGlobal(options: Omit<StandardLogOptions, 'customLevels'>) {
	if (ctx.configured) {
		const log = ctx.gsl!.standardLog.getLogger('standard-log')
		log.warn(
			'configGlobal() is being called more than once. Please make sure this is expected. Application should use `createStandardLog()` most of the time.'
		)
	}

	if (ctx.gsl) {
		if (options.logLevel) {
			ctx.gsl.store.logLevel = options.logLevel
		}
		if (options.reporters) {
			const reporters = ctx.gsl.store.reporters
			reporters.length = 0
			reporters.push(...options.reporters)
		}
	} else {
		ctx.gsl = createStandardLogClosure(options)
	}
	ctx.configured = true
}
