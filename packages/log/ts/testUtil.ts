import { range } from 'ramda'
import { plainLogFormatter } from './formatter.js'
import { toInspectLogEntry } from './platform.js'
import type { LogEntry } from './types.js'

export function rangeEntries(start: number, end: number, expected: any) {
	return range(start, end).map(value => [value, expected])
}

export function assertSSF(err: Error, filename: string) {
	const firstStackTrace = err.stack?.split('\n')[1]
	expect(firstStackTrace).toMatch(filename)
}

export function logEntriesToString(logs: LogEntry[]) {
	return logs.map(toInspectLogEntry).map(plainLogFormatter).join('\n')
}

export function wrapTest<F extends Record<any, any>>(fn: (test: jest.It) => F) {
	return Object.assign(fn(test), { only: fn(test.only), skip: fn(test.skip) })
}
