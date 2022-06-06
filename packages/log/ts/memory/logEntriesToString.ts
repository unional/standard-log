import { plainLogFormatter } from '../formatter/index.js'
import { LogEntry } from '../types.js'
import { toInspectLogEntry } from './toInspectStringForObject.js'

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(toInspectLogEntry).map(plainLogFormatter).join('\n')
}
