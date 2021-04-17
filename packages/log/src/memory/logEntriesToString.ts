import { plainLogFormatter } from '../formatter'
import { LogEntry } from '../types'
import { toInspectLogEntry } from './toInspectStringForObject'

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(toInspectLogEntry).map(plainLogFormatter).join('\n')
}
