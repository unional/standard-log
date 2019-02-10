import { LogLevel } from './LogLevel';

export type LogWriter<T extends LogLevel> = {
  [k in T]: (logger: { id: string }, messages: any[]) => void
}
