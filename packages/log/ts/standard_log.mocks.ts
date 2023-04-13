import { logLevels } from './log_levels.js'
import { createMemoryLogReporter, type MemoryLogReporter } from './memory.js'
import { createStandardLogClosure, type StandardLog } from './standard_log.js'
import type {
  LogLevel,
  LogMethodNames
} from './types.js'

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

