import { InvalidId } from './errors'
import { logLevels } from './logLevel'
import { getAllLogLevels, toLogLevel, toLogLevelName } from './logLevelFn'
import { addLogReporterInternal } from './logReporterInternal'
import { shouldLog } from './shouldLog'
import { store } from './store'
import { LogEntry, LogFunction, Logger, LogMethodNames, LogReporter, ReporterFilter } from './types'
import { LoggerClosure } from './typesInternal'
import { writeToReporters } from './writeToReporters'

export namespace getLogger {
  export type Options = {
    level?: number,
    writeTo?: LogReporter | ReporterFilter
  }
}

export function getLogger<T extends string = LogMethodNames>(
  id: string, options?: getLogger.Options
): Logger<T | LogMethodNames> {
  validateId(id)
  const loggerClosures = store.value.loggerClosures
  const loggerClosure: any = loggerClosures[id] ||
    (loggerClosures[id] = createLoggerClosure<T | LogMethodNames>(id, options))
  return loggerClosure.logger
}

function validateId(id: string) {
  if (/[`~!#$%^&*()=+[\]{},|<>?]/.test(id)) throw new InvalidId(id)
}

function createLoggerClosure<T extends string>(id: string, { level, writeTo = () => true }: getLogger.Options = {}): LoggerClosure<T> {
  const filter: (reporterId: string) => boolean = typeof writeTo === 'string'
    ? id => id === writeTo
    : writeTo instanceof RegExp
      ? id => writeTo.test(id)
      : typeof writeTo === 'function'
        ? writeTo
        : (addLogReporterInternal(writeTo), id => id === writeTo.id)

  function write(entry: LogEntry) {
    writeToReporters(entry, filter)
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
        const logLevel = typeof level === 'string' ? toLogLevel(level)! : level
        if (shouldLog(logLevel, logger.level)) {
          const methodName = toLogLevelName(logLevel)
          const bindedMethod = logger[methodName].bind(logger)
          const result = logFn(bindedMethod)
          if (result) bindedMethod(result)
        }
      }
    }
  })
  const loggerClosure: LoggerClosure<T> = {
    addMethod(name, level) {
      Object.defineProperty(logger, name, {
        writable: false,
        value: (...args: any[]) => {
          if (shouldLog(level, logger.level)) write({ id, level, args, timestamp: new Date() })
        }
      })
    },
    logger
  }

  getAllLogLevels().forEach(({ name, level }) => loggerClosure.addMethod(name, level))

  return loggerClosure
}
