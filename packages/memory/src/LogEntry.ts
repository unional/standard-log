import { toLogLevelName } from 'standard-log-core';
import uppercase from 'upper-case';

export type LogEntry = {
  id: string
  level: number
  messages: any[]
}

export const LogEntry = {
  toString(logs: LogEntry[]) {
    return logs
      .map(l => `${l.id} ${uppercase(toLogLevelName(l.level))} ${l.messages.join(' ')}`)
      .join('\n')
  }
}
