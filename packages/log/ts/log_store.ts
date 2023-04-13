import { mapKey, record, reduceByKey, reduceKey } from 'type-plus'
import { createConsoleLogReporter } from './console.js'
import { logLevels, toLogLevel, toLogLevelName } from './log_levels.js'
import type { Logger, LogLevel, LogMethodNames, LogReporter, StandardLogOptions } from './types.js'

export function createLogStore<N extends string = LogMethodNames>(
	options: Required<StandardLogOptions<N>>
): LogStore {
	return {
		loggers: record(),
		nonConsoleLoggers: record(),
		reporters: options.reporters || [createConsoleLogReporter()],
		logLevel: options.logLevel,
		logLevelStore: logLevelStore(options)
	}
}

export interface LogStore {
	loggers: Record<string, Logger>
	nonConsoleLoggers: Record<string, Logger>
	reporters: LogReporter[]
	logLevel: LogLevel
	logLevelStore: ReturnType<typeof logLevelStore>
}

export interface LogLevelStoreOptions {
	customLevels?: Record<string, number>
}

export function logLevelStore(options: LogLevelStoreOptions) {
	const customLevels = options.customLevels || record()

	const store = {
		customLevels,
		customLevelsReverse: reduceByKey(
			customLevels,
			(p, k) => {
				p[customLevels[k]] = k
				return p
			},
			{} as Record<number, string>
		)
	}
	return {
		getName(level: number) {
			return store.customLevelsReverse[level] ?? toLogLevelName(level)
		},
		getLevel(name: string) {
			return store.customLevels[name] ?? toLogLevel(name)
		},
		getAllLevels() {
			return reduceKey(
				logLevels,
				(result, name) => {
					if (name !== 'none' && name !== 'all') result.push({ name, level: logLevels[name] })

					return result
				},
				mapKey(store.customLevels, name => ({ name, level: store.customLevels[name] }))
			)
		}
	}
}
