import { logLevel } from '../core';
import { InvalidId } from '../errors';
import { getAllLogLevels, LogMethodNames, shouldLog, toLogLevel, toLogLevelName } from '../log-level';
import { store } from '../store';
import { LogFunction, Logger } from '../types';
import { writeToReporters } from '../util';

export function getLogger<T extends string = LogMethodNames>(id: string, defaultLogLevel?: number): Logger<T | LogMethodNames> {
  validateId(id)
  const loggers = store.get().loggers
  const logger = loggers[id]
  if (logger) return logger as any

  return loggers[id] = createLogger<T | LogMethodNames>(id, defaultLogLevel)
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}


function createLogger<T extends string>(id: string, level?: number): Logger<T> {
  const logger = getAllLogLevels().reduce((logger, { name, level }) => {
    logger[name] = (...args: any[]) => {
      if (shouldLog(level, logger.level)) writeToReporters({ id, level, args, timestamp: new Date() })
    }
    return logger
  }, {
    id,
    level
  } as any)

  let counter = 0;
  logger.count = (...args: any[]) => {
    const level = logLevel.debug
    if (shouldLog(level, logger.level))
      writeToReporters({
        id,
        level,
        args: [++counter, ...args],
        timestamp: new Date()
      })
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
