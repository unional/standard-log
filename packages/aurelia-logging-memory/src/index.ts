import { Logger, LogLevel, logLevel } from 'aurelia-logging'

export interface LogEntry {
  id: string
  level: number
  rest: any[]
}

export class MemoryAppender {
  public logs: LogEntry[] = []
  debug(logger: Logger, ...rest) {
    this.logs.push({ id: logger.id, level: logLevel.debug, rest})
  }
  info(logger: Logger, ...rest) {
    this.logs.push({ id: logger.id, level: logLevel.info, rest})
  }
  warn(logger: Logger, ...rest) {
    this.logs.push({ id: logger.id, level: logLevel.warn, rest})
  }
  error(logger: Logger, ...rest) {
    this.logs.push({ id: logger.id, level: logLevel.error, rest})
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
