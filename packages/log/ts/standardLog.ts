import { record, required } from 'type-plus'
import { createLogger } from './logger.js'
import { logLevels } from './logLevels.js'
import { createLogStore, LogStore } from './logStore.js'
import { createMemoryLogReporter, MemoryLogReporter } from './memory.js'
import type { Logger, LoggerOptions, LogLevel, LogMethodNames, StandardLogOptions } from './types.js'

export interface StandardLogInstance<N extends string = LogMethodNames> {
  logLevel: number,
  toLogLevelName(level: number): string,
  toLogLevel(name: N): number,
  getLogger(id: string, options?: LoggerOptions): Logger<N | LogMethodNames>
}

export interface StandardLog<N extends string = LogMethodNames> extends Readonly<StandardLogInstance<N>> {
}

export function createStandardLog<N extends string = LogMethodNames>(
  options?: StandardLogOptions<N>
): StandardLog<N> {
  const closure = createStandardLogClosure(options)
  if (!ctx.gsl) ctx.gsl = closure as any
  return closure.standardLog
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
      getLogger(id: string, options?: LoggerOptions) {
        if (store.loggers[id]) return store.loggers[id] as any
        return store.loggers[id] = createLogger(store, id, { ssf: this.getLogger, ...options }) as any
      }
    }
  }
}

export type StandardLogForTest<N extends string = LogMethodNames> = StandardLog<N> & { reporter: MemoryLogReporter }

export function createStandardLogForTest<N extends string = LogMethodNames>(
  logLevel: LogLevel = logLevels.debug
): StandardLogForTest<N> {
  const reporter = createMemoryLogReporter()
  const standardLog = createStandardLog<N>({ reporters: [reporter], logLevel })
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

export function getLogger<N extends string = LogMethodNames>(id: string, options?: LoggerOptions) {
  return getGlobalSL<N>().getLogger(id, options)
}

export const ctx: {
  configured?: boolean,
  gsl?: { store: LogStore, standardLog: StandardLogInstance<LogMethodNames> }
} = record()

function getGlobalSL<N extends string = LogMethodNames>(): StandardLogInstance<N> {
  if (!ctx.gsl) ctx.gsl = createStandardLogClosure()

  return ctx.gsl!.standardLog as StandardLogInstance<N>
}

export function configGlobal(options: Omit<StandardLogOptions, 'customLevels'>) {
  if (ctx.configured) {
    const log = ctx.gsl?.standardLog.getLogger('standard-log')
    log?.warn('configGlobal() is being called more than once. Please make sure this is expected. Application should use `createStandardLog()` most of the time.')
  }

  if (ctx.gsl) {
    if (options.logLevel) {
      ctx.gsl.store.logLevel = options.logLevel
    }
    if (options.reporters) {
      const reporters = ctx.gsl.store.reporters
      while (reporters.length > 0) reporters.pop()
      reporters.push(...options.reporters)
    }
  }
  else {
    ctx.gsl = createStandardLogClosure(options)
  }
  ctx.configured = true
}
