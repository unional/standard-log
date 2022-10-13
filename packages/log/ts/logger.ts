import { logLevels } from './logLevels.js'
import { LogStore } from './logStore.js'
import type { LogEntry, LogFunction, Logger, LoggerOptions, LogMethodNames, LogReporter } from './types.js'
import { LogLevel } from './types.js'

export function createLogger<N extends string = LogMethodNames>(
  store: LogStore, id: string, options?: LoggerOptions
): Logger<N | LogMethodNames> {
  id = sanitizeId(id)
  const writeTo = options?.writeTo ?? (() => true)
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
    level: options?.level,
    write
  } as any

  Object.defineProperties(logger, {
    id: { value: id, writable: false },
    count: {
      writable: false,
      value: ((counter) => (...args: any[]) => {
        const level = logLevels.debug
        if (shouldLog(store, level, logger.level))
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
      value: (level: number | N | LogMethodNames, logFn: LogFunction) => {
        const logLevel = typeof level === 'string' ? store.logLevelStore.getLevel(level)! : level
        if (shouldLog(store, logLevel, logger.level)) {
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
        if (shouldLog(store, level, logger.level)) write({ id, level, args, timestamp: new Date() })
      }
    })
  })
  return logger
}

function sanitizeId(id: string) {
  return id.replace(/[`~!#$%^&*()=+[\]{},|<>?]/g, '-')
}

function writeToReporters(reporters: LogReporter[], logEntry: LogEntry, filter: (reporterId: string) => boolean) {
  reporters.filter(r => filter(r.id)).forEach(r => r.write(logEntry!))
}

/**
 * Determines should you log.
 * @param loggerLevel Log level of the logger.
 * It can be undefined which the global log level will be used.
 */
function shouldLog(store: LogStore, targetLevel: LogLevel, loggerLevel: LogLevel | undefined) {
  return targetLevel <= (loggerLevel !== undefined ? loggerLevel : store.logLevel)
}
