import { StackTraceMeta } from '@just-func/types'
import { required } from 'type-plus'
import { createLogger } from './logger.js'
import { logLevels } from './logLevels.js'
import { createLogStore, LogStore } from './logStore.js'
import { createMemoryLogReporter } from './memory.js'
import type { Logger, LoggerOptions, LogLevel, LogMethodNames, StandardLogOptions } from './types.js'

export interface StandardLogInstance<N extends string = LogMethodNames> {
  logLevel: number,
  toLogLevelName(level: number): string,
  toLogLevel(name: N): number,
  getLogger(params: [id: string, options?: LoggerOptions], meta?: StackTraceMeta): Logger<N | LogMethodNames>
}

export interface StandardLog<N extends string = LogMethodNames> extends Readonly<StandardLogInstance<N>> {
}

export function createStandardLog<N extends string = LogMethodNames>(
  options?: StandardLogOptions<N>
): StandardLog<N> {
  return createStandardLogClosure(options).standardLog
}

export function createStandardLogClosure<N extends string = LogMethodNames>(
  options?: StandardLogOptions<N>
): { store: LogStore, standardLog: StandardLog<N> } {
  const store = createLogStore(required({ logLevel: logLevels.info }, options))

  return {
    store,
    standardLog: {
      get logLevel() { return store.logLevel },

      toLogLevelName(level: number) {
        return store.logLevelStore.getName(level)
      },
      toLogLevel(name: string) {
        return store.logLevelStore.getLevel(name)
      },
      getLogger([id, options]: [id: string, options?: LoggerOptions], meta?: StackTraceMeta) {
        if (store.loggers[id]) return store.loggers[id] as any
        return store.loggers[id] = createLogger([store, id, options], { ssf: this.getLogger, ...meta }) as any
      }
    }
  }
}

export function createStandardLogForTest(logLevel: LogLevel = logLevels.debug) {
  const reporter = createMemoryLogReporter()
  const standardLog = createStandardLog({ reporters: [reporter], logLevel })
  return { ...standardLog, reporter }
}

/**
 * Suppress logging within the code block.
 */
export function suppressLogs<R>(block: () => R, log: Logger, ...logs: Logger[]): R
export function suppressLogs<R>(block: () => R, ...logs: Logger[]): R {
  const origLevels = logs.map(l => l.level)
  logs.forEach(l => l.level = logLevels.none)
  const result = block()
  logs.forEach((l, i) => l.level = origLevels[i])
  return result
}
