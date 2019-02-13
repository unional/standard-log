import { getAllLogLevels, Logger, LogLevel, onAddCustomLogLevel } from 'standard-log-core';
import { forEachKey } from 'type-plus';
import { InvalidId } from './errors';
import { store } from './store';

export function getLogger<T extends string = LogLevel>(id: string): Logger<T> {
  validateId(id)
  const loggers = store.get().loggers
  const logger = loggers[id]
  if (logger) return logger

  return loggers[id] = createLogger(id)

  // return loggers[id] = new Proxy<Logger<T>>({ id } as any, {
  //   get(target, prop) {
  //     if (typeof prop === 'string') {
  //       const level = toLogLevel(prop)
  //       if (level) {
  //         return (...messages: any[]) => {
  //           const reporters = store.get().reporters
  //           if (reporters.length > 0) {
  //             reporters.forEach(w => w.write({ loggerId: target.id, level, messages, timestamp: new Date() }))
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}

function createLogger(id: string) {
  return getAllLogLevels().reduce((logger, { name, level }) => {
    logger[name] = (...messages: any[]) => {
      const reporters = store.get().reporters
      reporters.forEach(r => r.write({ loggerId: logger.id, level, messages, timestamp: new Date() }))
    }
    return logger
  }, { id } as Logger<any>)
}

onAddCustomLogLevel(({ name, level }) => {
  const { loggers } = store.get()
  forEachKey(loggers, id => {
    loggers[id][name] = (...messages: any[]) => {
      const reporters = store.get().reporters
      reporters.forEach(r => r.write({ loggerId: id, level, messages, timestamp: new Date() }))
    }
  })
})
