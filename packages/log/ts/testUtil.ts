import R from 'ramda'
import { LogEntry } from './types.js'
import { writeToReporters } from './writeToReporters.js'

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
