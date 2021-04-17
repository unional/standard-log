import isNode from 'is-node'
import { plainLogFormatter } from '../formatter'
import { LogEntry } from '../types'
import { toInspectStringForObject } from './toInspectStringForObject'

export function logEntriesToString(logs: LogEntry[]) {

  const r = logs.map(plainLogFormatter)
  if (isNode) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const inspect = require('util').inspect
    return r.map(entry => entry.map(
      arg => toInspectStringForObject(inspect, arg)
    )).join('\n')
  }
  return r.join('\n')
}
