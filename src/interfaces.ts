import { Logger as ALogger } from 'aurelia-logging'

export type logMethod = (...args: any[]) => void

export interface Logger extends ALogger {
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  setLevel(level: number): void

  onError(logFunction: (log: logMethod) => void): void
  onWarn(logFunction: (log: logMethod) => void): void
  onInfo(logFunction: (log: logMethod) => void): void
  onDebug(logFunction: (log: logMethod) => void): void
}
