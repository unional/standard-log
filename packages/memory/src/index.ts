import { logLevel } from 'aurelia-logging';
import upperCase from 'upper-case';

export interface LogEntry {
  id: string
  level: number
  messages: any[]
}

export class MemoryAppender {
  static addCustomLevel(name: string, level: number) {
    (MemoryAppender as any).prototype[name] = function (logger: { id: string }, ...messages: any[]) {
      this.logs.push({ id: logger.id, level, messages })
    }
  }
  public logs: LogEntry[] = [];

  debug(logger: { id: string }, ...messages: any[]) {
    this.logs.push({ id: logger.id, level: logLevel.debug, messages })
  }
  info(logger: { id: string }, ...messages: any[]) {
    this.logs.push({ id: logger.id, level: logLevel.info, messages })
  }
  warn(logger: { id: string }, ...messages: any[]) {
    this.logs.push({ id: logger.id, level: logLevel.warn, messages })
  }
  error(logger: { id: string }, ...messages: any[]) {
    this.logs.push({ id: logger.id, level: logLevel.error, messages })
  }
}

export function stringifyLogLevel(level: number) {
  return upperCase(Object.keys(logLevel).find(n => logLevel[n] === level) || level.toString())
}
