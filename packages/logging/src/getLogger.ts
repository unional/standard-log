import { logLevel } from 'aurelia-logging';
import { getLogMethodName } from './getLogMethodName';
import { LogFunction, Logger } from './interfaces';
import { store } from './store';

export function getLogger(id: string, defaultLogLevel?: number): Logger {
  const { logs } = store.get()
  if (logs[id]) return logs[id]

  return logs[id] = new LoggerImpl(id, defaultLogLevel)
}

class LoggerImpl {
  level: number
  constructor(public id: string, defaultLogLevel?: number) {
    if (defaultLogLevel !== undefined) {
      this.level = defaultLogLevel
    }
    else {
      this.level = store.get().logLevel
    }
  }
  error(...args: any[]) {
    if (this.level >= logLevel.error) {
      const { appenders, defaultAppender } = store.get()
      if (appenders.length === 0) defaultAppender.error(this, ...args)
      appenders.forEach(a => a.error(this, ...args))
    }
  }
  warn(...args: any[]) {
    if (this.level >= logLevel.warn) {
      const { appenders, defaultAppender } = store.get()
      if (appenders.length === 0) defaultAppender.warn(this, ...args)
      appenders.forEach(a => a.warn(this, ...args))
    }
  }
  info(...args: any[]) {
    if (this.level >= logLevel.info) {
      const { appenders, defaultAppender } = store.get()
      if (appenders.length === 0) defaultAppender.info(this, ...args)
      appenders.forEach(a => a.info(this, ...args))
    }
  }
  debug(...args: any[]) {
    if (this.level >= logLevel.debug) {
      const { appenders, defaultAppender } = store.get()
      if (appenders.length === 0) defaultAppender.debug(this, ...args)
      appenders.forEach(a => a.debug(this, ...args))
    }
  }
  onError(logfn: LogFunction) {
    this.on(logLevel.error, logfn)
  }
  onWarn(logfn: LogFunction) {
    this.on(logLevel.warn, logfn)
  }
  onInfo(logfn: LogFunction) {
    this.on(logLevel.info, logfn)
  }
  onDebug(logfn: LogFunction) {
    this.on(logLevel.debug, logfn)
  }
  on(logLevel: number, logfn: LogFunction) {
    if (this.level >= logLevel) {
      const methodName = getLogMethodName(logLevel)
      if (methodName) {
        const bindedMethod = this[methodName].bind(this)
        const result = logfn(bindedMethod)
        if (result) bindedMethod(result)
      }
    }
  }
}
