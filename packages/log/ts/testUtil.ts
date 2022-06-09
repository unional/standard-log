import R from 'ramda'
import { plainLogFormatter } from './formatter.js'
import { toInspectLogEntry } from './platform/index.js'
import { writeToReporters } from './reporter.js'
import type { LogEntry } from './types.js'

export function rangeEntries(start: number, end: number, expected: any) {
  return R.range(start, end).map(value => ([value, expected]))
}

export function captureWrittenLog() {
  const logs: LogEntry[] = []
  const orig = writeToReporters.fn
  writeToReporters.fn = l => logs.push(l)
  return {
    logs,
    reset() {
      writeToReporters.fn = orig
    }
  }
}

export function assertSSF(err: Error, filename: string) {
  const firstStackTrace = err.stack?.split('\n')[1]
  expect(firstStackTrace).toMatch(filename)
}

export function logEntriesToString(logs: LogEntry[]) {
  return logs.map(toInspectLogEntry).map(plainLogFormatter).join('\n')
}
