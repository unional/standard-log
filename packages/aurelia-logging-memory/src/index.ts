import { Logger, logLevel } from 'aurelia-logging'

export interface LogEntry {
  id: string
  level: number
  messages: any[]
}

export class MemoryAppender {
  public logs: LogEntry[] = []
  debug(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.debug, messages})
  }
  info(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.info, messages})
  }
  warn(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.warn, messages})
  }
  error(logger: Logger, ...messages) {
    this.logs.push({ id: logger.id, level: logLevel.error, messages})
  }
}

export function stringifyLogLevel(level: number) {
  switch (level) {
    case logLevel.debug:
      return 'DEBUG'
    case logLevel.error:
      return 'ERROR'
    case logLevel.info:
      return 'INFO'
    case logLevel.warn:
      return 'WARN'
  }
}
