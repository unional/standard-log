import type { StackTraceMeta } from '@just-func/types'
import { RequiredPick } from 'type-plus'
import { InvalidId } from './errors.js'
import { logLevels } from './logLevels.js'
import { LogStore } from './logStore.js'
import { shouldLog } from './shouldLog.js'
import type { LogEntry, LogFunction, Logger, LoggerOptions, LogMethodNames, LogReporter } from './types.js'

export function createLogger<T extends string = LogMethodNames>(
  [store, id, { level, writeTo = () => true }]: [LogStore, string, RequiredPick<LoggerOptions, 'level'>],
  meta?: StackTraceMeta
): Logger {
  validateId(id, meta)
  const [filter, reporters]: [(reporterId: string) => boolean, LogReporter[]] = typeof writeTo === 'string'
    ? [id => id === writeTo, store.reporters]
    : writeTo instanceof RegExp
      ? [id => writeTo.test(id), store.reporters]
      : typeof writeTo === 'function'
        ? [writeTo, store.reporters]
        : [() => true, [writeTo]]

  function write(entry: LogEntry) {
    writeToReporters(reporters, entry, filter)
  }

  const logger = {
    level,
    write
  } as any

  Object.defineProperties(logger, {
    id: { value: id, writable: false },
    count: {
      writable: false,
      value: ((counter) => (...args: any[]) => {
        const level = logLevels.debug
        if (shouldLog(level, logger.level))
          write({
            id,
            level,
            args: [++counter, ...args],
            timestamp: new Date()
          })
      })(0)
    },
    on: {
      writable: false,
      value: (level: number | T, logFn: LogFunction) => {
        const logLevel = typeof level === 'string' ? store.logLevelStore.getLevel(level)! : level
        if (shouldLog(logLevel, logger.level)) {
          const methodName = store.logLevelStore.getName(logLevel)
          const bindedMethod = logger[methodName].bind(logger)
          const result = logFn(bindedMethod)
          if (result) bindedMethod(result)
        }
      }
    }
  })
  store.logLevelStore.getAllLevels().forEach(function addMethod({ name, level }) {
    Object.defineProperty(logger, name, {
      writable: false,
      value: (...args: any[]) => {
        if (shouldLog(level, logger.level)) write({ id, level, args, timestamp: new Date() })
      }
    })
  })
  return logger
}

function validateId(id: string, meta?: StackTraceMeta) {
  if (/[`~!#$%^&*()=+[\]{},|<>?]/.test(id)) throw new InvalidId(id, meta)
}

function writeToReporters(reporters: LogReporter[], logEntry: LogEntry, filter: (reporterId: string) => boolean) {
  reporters.filter(r => filter(r.id)).forEach(r => r.write(logEntry!))
}
