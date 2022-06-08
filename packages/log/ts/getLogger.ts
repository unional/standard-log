import { InvalidId } from './errors.js'
import { logLevels } from './logLevel.js'
import { getAllLogLevels, toLogLevel, toLogLevelName } from './logLevelFn.js'
import { shouldLog } from './shouldLog.js'
import { store } from './store.js'
import type {
  LogEntry, LogFunction, Logger, LogMethodNames,
  LogReporter, ReporterFilter
} from './types.js'
import { LoggerClosure } from './typesInternal.js'
import { writeToReporters } from './reporter.js'

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
  if (/[`~!#$%^&*()=+[\]{},|<>?]/.test(id)) throw new InvalidId(id, { ssf: getLogger })
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

function addLogReporterInternal(reporter: LogReporter) {
  if (reporter.isConsoleReporter) {
    const r = getConsoleReporter()
    if (r && reporter.filter) {
      const f = r.filter
      const f2 = reporter.filter
      if (f) r.filter = entry => f(entry) && f2(entry)
      else r.filter = f2
    }
  }
  else {
    store.value.reporters.push(reporter)
  }
}

function getConsoleReporter() {
  return store.value.reporters.find(r => r.isConsoleReporter)
}
