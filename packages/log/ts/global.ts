import { StackTraceMeta } from '@just-func/types'
import { record } from 'type-plus'
import { LogStore } from './logStore.js'
import { createStandardLogClosure, StandardLogInstance } from './standardLog.js'
import { LoggerOptions, LogMethodNames, StandardLogOptions } from './types.js'

export function getLogger<N extends string = LogMethodNames>(
  params: [id: string, options?: LoggerOptions], meta?: StackTraceMeta) {
  return getGlobalSL<N>().getLogger(params, meta)
}

export const ctx: { gsl?: { store: LogStore, standardLog: StandardLogInstance<any> } } = record()

function getGlobalSL<N extends string = LogMethodNames>(): StandardLogInstance<N> {
  if (!ctx.gsl) configGlobal({})

  return ctx.gsl!.standardLog
}

export function configGlobal<N extends string = LogMethodNames>(options: Omit<StandardLogOptions, 'customLevels'>) {
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
    ctx.gsl = createStandardLogClosure<N>(options)
  }
}
