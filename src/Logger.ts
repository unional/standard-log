import { Logger as ALogger, logLevel } from 'aurelia-logging'

import { hasAppender, addAppender } from './Appender'
import { logMethod } from './interfaces'
import { store } from './store'
import { logLevelNameMap } from './utils'

export class LoggerImpl implements ALogger {
  get id() {
    return this.logger.id
  }

  get level() {
    return this.logger.level
  }

  constructor(private logger: ALogger, defaultLogLevel?: number) {
    if (defaultLogLevel !== undefined) {
      logger.setLevel(defaultLogLevel)
    }
  }

  debug(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.debug.apply(this.logger, args)
  }

  info(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.info.apply(this.logger, args)
  }

  warn(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.warn.apply(this.logger, args)
  }

  error(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.error.apply(this.logger, args)
  }

  setLevel(level: number): void {
    this.logger.setLevel(level)
  }

  onError(logFunction: (log: logMethod) => void) {
    this.on(logLevel.error, logFunction)
  }

  onWarn(logFunction: (log: logMethod) => void) {
    this.on(logLevel.warn, logFunction)
  }

  onInfo(logFunction: (log: logMethod) => void) {
    this.on(logLevel.info, logFunction)
  }

  onDebug(logFunction: (log: logMethod) => void) {
    this.on(logLevel.debug, logFunction)
  }

  private on(logLevel, logFunction) {
    if (this.level >= logLevel) {
      const logFn = this.logger[logLevelNameMap[logLevel]].bind(this.logger)
      const result = logFunction(logFn)
      if (result) logFn(result)
    }
  }
}

function addDefaultAppenderIfNeeded() {
  if (!hasAppender()) {
    const defAppender = store.get().defaultAppender
    if (defAppender)
      addAppender(defAppender)
  }
}
