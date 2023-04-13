import { logLevels } from 'standard-log'
import { toSyslogKeyword, toSyslogSeverity } from './index.js'
import { toSyslogLevel } from './syslog.js'
import { rangeEntries } from './test-util/index.js'

describe('toSyslogSeverity()', () => {
	test.each([
		...rangeEntries('emergency', [0, 1, 100, 199]),
		...rangeEntries('alert', [200, 299]),
		...rangeEntries('critical', [300, 399]),
		...rangeEntries('error', [400, 499]),
		...rangeEntries('warning', [500, 599]),
		...rangeEntries('notice', [600, 699]),
		...rangeEntries('informational', [700, 799]),
		...rangeEntries('debug', [800, 900, 1000, Infinity])
	])('convert %i to %s', (level: number, severity: string) => {
		expect(toSyslogSeverity(level)).toBe(severity)
	})
})

describe('toSyslogKeyword()', () => {
	test.each([
		...rangeEntries('emerg', [1, 199]),
		...rangeEntries('alert', [200, 299]),
		...rangeEntries('crit', [300, 399]),
		...rangeEntries('err', [400, 499]),
		...rangeEntries('warning', [500, 599]),
		...rangeEntries('notice', [600, 699]),
		...rangeEntries('info', [700, 799]),
		...rangeEntries('debug', [800, 900, 1000, Infinity])
	])('convert %i to %s', (level: number, keyword: string) => {
		expect(toSyslogKeyword(level)).toBe(keyword)
	})
})

describe('toSyslogLevel()', () => {
	test.each([
		[logLevels.emergency, 0],
		[logLevels.alert, 1],
		[logLevels.critical, 2],
		[logLevels.error, 3],
		[logLevels.warn, 4],
		[logLevels.notice, 5],
		[logLevels.info, 6],
		[logLevels.debug, 7]
	])(`convert %i to %i`, (level: number, syslogLevel: number) => {
		expect(toSyslogLevel(level)).toBe(syslogLevel)
	})
})
