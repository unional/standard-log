import { Logger as ALogger } from 'aurelia-logging';
import { addAppender, hasAppender } from './Appender';
import { logMethod } from './interfaces';
import { logLevel } from './logLevel';
import { store } from './store';
import { getLogMethodName } from './getLogMethodName';

export class LoggerImpl {
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
    this.logger.debug.apply(this.logger, args as any)
  }

  info(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.info.apply(this.logger, args as any)
  }

  warn(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.warn.apply(this.logger, args as any)
  }

  error(...args: any[]): void {
    addDefaultAppenderIfNeeded()
    this.logger.error.apply(this.logger, args as any)
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

  private on(logLevel: number, logFunction: any) {
    if (this.level >= logLevel) {
      const methodName = getLogMethodName(logLevel)
      if (methodName !== 'none') {
        const logFn = this.logger[methodName].bind(this.logger)
        const result = logFunction(logFn)
        if (result) logFn(result)
      }
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
