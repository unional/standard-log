import { InvalidId } from './errors';
import { logLevels } from './logLevel';
import { getAllLogLevels, toLogLevel, toLogLevelName } from './logLevelFn';
import { shouldLog } from './shouldLog';
import { store } from './store';
import { LogFunction, Logger, LogMethodNames, ReporterFilter } from './types';
import { writeToReporters } from './writeToReporters';

export namespace getLogger {
  export type Options = {
    level?: number,
    writeTo?: ReporterFilter
  }
}

export function getLogger<T extends string = LogMethodNames>(id: string, options?: getLogger.Options): Logger<T | LogMethodNames> {
  validateId(id)
  const loggers = store.value.loggers
  const logger = loggers[id]
  if (logger) return logger as any

  return loggers[id] = createLogger<T | LogMethodNames>(id, options)
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+[\]{}\\/,|<>?]/.test(id)) throw new InvalidId(id)
}

function createLogger<T extends string>(id: string, { level, writeTo = () => true }: getLogger.Options = {}): Logger<T> {
  const filter: (reporterId: string) => boolean = typeof writeTo === 'string' ? id => id === writeTo :
    writeTo instanceof RegExp ? id => writeTo.test(id) : writeTo

  const logger = getAllLogLevels().reduce((logger, { name, level }) => {
    logger[name] = (...args: any[]) => {
      if (shouldLog(level, logger.level)) writeToReporters({ id, level, args, timestamp: new Date() }, filter)
    }
    return logger
  }, { id, level } as any)

  let counter = 0;
  logger.count = (...args: any[]) => {
    const level = logLevels.debug
    if (shouldLog(level, logger.level))
      writeToReporters({
        id,
        level,
        args: [++counter, ...args],
        timestamp: new Date()
      }, filter)
  }

  logger.on = (level: number | T, logfn: LogFunction) => {
    // tslint:disable-next-line: strict-type-predicates
    const logLevel = typeof level === 'string' ? toLogLevel(level)! : level
    if (shouldLog(logLevel, logger.level)) {
      const methodName = toLogLevelName(logLevel)
      const bindedMethod = logger[methodName].bind(logger)
      const result = logfn(bindedMethod)
      if (result) bindedMethod(result)
    }
  }

  return logger
}
