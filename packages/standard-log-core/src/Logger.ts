import { LogLevel } from './logLevel';

export type Logger<T extends string = LogLevel> = {
  id: string
} & {
    [k in T]: (...args: any[]) => void
  }
