import { LogLevel } from 'standard-log-core'

export type Logger<T extends LogLevel> = {
  [k in T]: () => void
}
