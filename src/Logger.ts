import { Logger as ALogger, logLevel } from 'aurelia-logging'
import { logMethod } from './interfaces'

export class LoggerImpl implements ALogger {
  get id() {
    return this.logger.id
  }

  get level() {
    return this.logger.level
  }

  constructor(private logger: ALogger) { }

  debug(...args: any[]): void {
    this.logger.debug.apply(this.logger, args)
  }

  info(...args: any[]): void {
    this.logger.info.apply(this.logger, args)
  }

  warn(...args: any[]): void {
    this.logger.warn.apply(this.logger, args)
  }

  error(...args: any[]): void {
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
    if (this.level >= logLevel)
      logFunction(this.logger)
  }
}
