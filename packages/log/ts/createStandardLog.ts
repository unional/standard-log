import { required } from 'type-plus'
import { ConfigOptions } from './config.js'
import { createLogger } from './logger.js'
import { logLevels } from './logLevels.js'
import { createLogStore } from './logStore.js'
import { createMemoryLogReporter } from './memory.js'
import { Logger, LoggerOptions, LogLevel, LogMethodNames, StackTraceMeta } from './types.js'

export interface StandLog<N extends string = LogMethodNames> {
  readonly logLevel: number,
  toLogLevelName(level: number): string,
  toLogLevel(name: N): number,
  getLogger(params: [id: string, options?: LoggerOptions], meta?: StackTraceMeta): Logger<N>
}

export function createStandardLog<N extends string = LogMethodNames>(
  options?: Partial<ConfigOptions<N>>, _meta?: StackTraceMeta
): Readonly<StandLog<N>> {
  const store = createLogStore(required({ logLevel: logLevels.info }, options))

  return Object.freeze({
    get logLevel() { return store.logLevel },
    toLogLevelName(level: number) {
      return store.logLevelStore.getName(level)
    },
    toLogLevel(name: string) {
      return store.logLevelStore.getLevel(name)
    },
    getLogger([id, options]: [id: string, options?: LoggerOptions], meta?: StackTraceMeta): Logger<N> {
      if (store.loggers[id]) return store.loggers[id] as any
      const opt = required({ level: store.logLevel }, options)
      return store.loggers[id] = createLogger([store, id, opt], { ssf: this.getLogger, ...meta }) as any
    }
  })
}

export function createStandardLogForTest(logLevel: LogLevel = logLevels.debug) {
  const reporter = createMemoryLogReporter()
  const standardLog = createStandardLog({
    reporters: [reporter],
    logLevel
  })
  return {
    ...standardLog,
    reporter
  }
}
