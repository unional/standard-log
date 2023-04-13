import { logLevels } from './log_levels.js'
import { createMemoryLogReporter, type MemoryLogReporter } from './memory.js'
import { createStandardLogClosure, type StandardLog } from './standard_log.js'
import type { LogMethodNames, StandardLogOptions } from './types.js'

export type StandardLogForTest<N extends string = LogMethodNames> = StandardLog<N> & {
	reporter: MemoryLogReporter
}

export function createStandardLogForTest<N extends string = LogMethodNames>(
	options: StandardLogOptions<N> = {}
): StandardLogForTest<N> {
	options.logLevel = options.logLevel ?? logLevels.debug
	options.reporters = options.reporters ?? []
	const existingReporter = options.reporters.find(r => r.id === 'memory') as MemoryLogReporter
	const reporter = existingReporter ?? createMemoryLogReporter()
	if (!existingReporter) {
		options.reporters.push(reporter)
	}
	const closure = createStandardLogClosure<N>(options)
	return { ...closure.standardLog, reporter }
}
