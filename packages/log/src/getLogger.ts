import { getAllLogLevels, LogEntry, LogFunction, Logger, logLevel, LogMethodNames, onAddCustomLogLevel, toLogLevelName } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { InvalidId } from './errors';
import { store } from './store';

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

function createLogger<T extends string>(id: string, defaultLogLevel?: number): Logger<T> {
  const level = defaultLogLevel !== undefined ? defaultLogLevel : store.get().logLevel
  const logger = getAllLogLevels().reduce((logger, { name, level }) => {
    logger[name] = (...args: any[]) => {
      if (logger.level >= level) writeToReporters({ id, level, args, timestamp: new Date() })
    }
    return logger
  }, {
    id,
    level
  } as any)

  let counter = 0;
  logger.count = (...args: any[]) => {
    const level = logLevel.debug
    if (logger.level >= level)
      writeToReporters({
        id,
        level,
        args: [++counter, ...args],
        timestamp: new Date()
      })
  }

  logger.on = (level: number, logfn: LogFunction) => {
    if (logger.level >= level) {
      const methodName = toLogLevelName(level)
      const bindedMethod = logger[methodName].bind(logger)
      const result = logfn(bindedMethod)
      if (result) bindedMethod(result)
    }
  }

  return logger
}

onAddCustomLogLevel(({ name, level }) => {
  const { loggers } = store.get()
  forEachKey(loggers, id => loggers[id][name] = (...args: any[]) => writeToReporters({ id, level, args, timestamp: new Date() }))
})

function writeToReporters(logEntry: LogEntry) {
  store.get().reporters.forEach(r => r.write(logEntry))
}
