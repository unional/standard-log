import { Logger, LogLevel, toLogLevel, LogReporter } from 'standard-log-core';
import { InvalidId } from './errors';
import { store } from './store';

export function getLogger<T extends string = LogLevel>(id: string): Logger<T> {
  validateId(id)
  const loggers = store.get().loggers
  const logger = loggers[id]
  if (logger) return logger as any

  return loggers[id] = new Proxy<Logger>({ id } as any, {
    get(target, prop) {
      if (typeof prop === 'string') {
        const level = toLogLevel(prop)
        if (level) {
          return (...messages: any[]) => {
            const reporters = store.get().reporters
            if (reporters.length > 0) {
              reporters.forEach(w => w.write({ loggerId: target.id, level, messages, timestamp: new Date() }))
            }
          }
        }
      }
    }
  }) as any
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}
