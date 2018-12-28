
export type logMethod = (...args: any[]) => void

export interface Logger {
  id: string
  level: number
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  setLevel(level: number): void

  onError(logFunction: ((log: logMethod) => void) | (() => string)): void
  onWarn(logFunction: ((log: logMethod) => void) | (() => string)): void
  onInfo(logFunction: ((log: logMethod) => void) | (() => string)): void
  onDebug(logFunction: ((log: logMethod) => void) | (() => string)): void
}
