import { getAllLogLevels, LogEntry, Logger, LogMethodNames, logLevel, onAddCustomLogLevel } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { InvalidId } from './errors';
import { store } from './store';

export function getLogger<T extends string>(id: string): Logger<T | LogMethodNames> {
  validateId(id)
  const loggers = store.get().loggers
  const logger = loggers[id]
  if (logger) return logger as any

  return loggers[id] = createLogger<T | LogMethodNames>(id)
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}

function createLogger<T extends string>(id: string): Logger<T> {
  let counter = 0;
  const logger = getAllLogLevels().reduce((logger, { name, level }) => {
    logger[name] = (...args: any[]) => writeToReporters({ id, level, args, timestamp: new Date() })
    return logger
  }, {
    id
  } as any)

  logger.count = (...args: any[]) => writeToReporters({
    id,
    level: logLevel.debug,
    args: [++counter, ...args],
    timestamp: new Date()
  })

  return logger
}

onAddCustomLogLevel(({ name, level }) => {
  const { loggers } = store.get()
  forEachKey(loggers, id => loggers[id][name] = (...args: any[]) => writeToReporters({ id, level, args, timestamp: new Date() }))
})

function writeToReporters(logEntry: LogEntry) {
  if (store.get().logLevel >= logEntry.level)
    store.get().reporters.forEach(r => r.write(logEntry))
}
