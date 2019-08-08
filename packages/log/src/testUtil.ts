import R from 'ramda';
import { writeToReporters } from './utils';
import { LogEntry } from './types';

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
