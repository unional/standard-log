import { Logger, logLevel } from 'aurelia-logging'
import upperCase = require('upper-case')

export interface LogEntry {
  id: string
  level: number
  messages: any[]
}


export class MemoryAppender {
  static addCustomLevel(name, level) {
    MemoryAppender.prototype[name] = function (logger: Logger, ...messages) {
      this.logs.push({ id: logger.id, level, messages })
    }
  }
  public logs: LogEntry[] = [];

  debug(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.debug, messages })
  }
  info(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.info, messages })
  }
  warn(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.warn, messages })
  }
  error(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.error, messages })
  }
}

export function stringifyLogLevel(level: number) {
  return upperCase(Object.keys(logLevel).find(n => logLevel[n] === level) || level.toString())
}
