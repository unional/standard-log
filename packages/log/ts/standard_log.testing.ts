import { createConsoleLogReporter } from './console.js'
import { logLevels } from './log_levels.js'
import { createMemoryLogReporter, type MemoryLogReporter } from './memory.js'
import { createStandardLogClosure, type StandardLog } from './standard_log.js'
import type { LogMethodNames, StandardLogOptions } from './types.js'

export type StandardLogForTestOptions<N extends string = LogMethodNames> = StandardLogOptions<N> & {
	/**
	 * Send the logs to console for easy debugging.
	 *
	 * @default false
	 */
	emitLog?: boolean
}

export type StandardLogForTest<N extends string = LogMethodNames> = StandardLog<N> & {
	reporter: MemoryLogReporter
}

export function createStandardLogForTest<N extends string = LogMethodNames>(
	options: StandardLogForTestOptions<N> = {}
): StandardLogForTest<N> {
	options.logLevel = options.logLevel ?? logLevels.debug
	options.reporters = options.reporters ?? []

	if (options.emitLog && !options.reporters.some(r => r.isConsoleReporter)) {
		// this is used for debugging,
		// so no need to use color reporter.
		options.reporters.push(createConsoleLogReporter())
	}

	const existingReporter = options.reporters.find(r => r.id === 'memory') as MemoryLogReporter
	const reporter = existingReporter ?? createMemoryLogReporter()
	if (!existingReporter) {
		options.reporters.push(reporter)
	}
	const closure = createStandardLogClosure<N>(options)
	return { ...closure.standardLog, reporter }
}
