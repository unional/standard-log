import { StackTraceMeta } from '@just-func/types'
import { record } from 'type-plus'
import { LogStore } from './logStore.js'
import { createStandardLogClosure, StandardLogInstance } from './standardLog.js'
import { LoggerOptions, LogMethodNames, StandardLogOptions } from './types.js'

export function getLogger<N extends string = LogMethodNames>(
  params: [id: string, options?: LoggerOptions], meta?: StackTraceMeta) {
  return getGlobalSL<N>().getLogger(params, meta)
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
    const log = ctx.gsl?.standardLog.getLogger(['standard-log'])
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
