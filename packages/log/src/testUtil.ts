import R from 'ramda';
import { LogEntry } from './types';
import { writeToReporters } from './writeToReporters';

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
