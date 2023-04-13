import { forEachKey } from 'type-plus'
import { logLevels } from './log_levels.js'
import { logLevelStore } from './log_store.js'
import { rangeEntries } from './test_utils.js'

describe('getName()', () => {
	it.each([
		...rangeEntries(99, 100, 'emergency'),
		...rangeEntries(199, 200, 'alert'),
		...rangeEntries(299, 300, 'critical'),
		...rangeEntries(399, 400, 'error'),
		...rangeEntries(499, 500, 'warn'),
		...rangeEntries(599, 600, 'notice'),
		...rangeEntries(699, 700, 'info'),
		...rangeEntries(799, 800, 'debug'),
		...rangeEntries(899, 900, 'trace'),
		...rangeEntries(9999999, 10000000, 'planck')
	])('convert %i to %s', (level: number, logLevel: string) => {
		const store = logLevelStore({ customLevels: {} })
		expect(store.getName(level)).toBe(logLevel)
	})
	it('gets custom log level name', () => {
		const store = logLevelStore({ customLevels: { 'cust-name': 144 } })
		expect(store.getName(144)).toBe('cust-name')
	})
})

describe('getLevel()', () => {
	it('get default log levels', () => {
		const store = logLevelStore({ customLevels: {} })
		const names = [
			'emergency',
			'alert',
			'critical',
			'error',
			'warn',
			'notice',
			'info',
			'debug',
			'trace',
			'planck'
		]
		expect(names.map(n => store.getLevel(n))).toEqual([100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity])
	})
	it('is case insensitive for default levels', () => {
		const store = logLevelStore({ customLevels: {} })
		const names = [
			'emerGency',
			'aleRt',
			'critIcal',
			'errOr',
			'warN',
			'nOtice',
			'iNfo',
			'deBug',
			'traCe',
			'planCk'
		]
		expect(names.map(n => store.getLevel(n))).toEqual([100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity])
	})
	it('gets custom log level', () => {
		const store = logLevelStore({ customLevels: { 'cust-get': 123 } })
		expect(store.getLevel('cust-get')).toBe(123)
	})
})

describe('getAllLevels()', () => {
	it('gets all default log levels except none and all', () => {
		const store = logLevelStore({ customLevels: {} })
		const actual = store.getAllLevels()
		forEachKey(logLevels, name => {
			if (name === 'none' || name === 'all') {
				expect(actual.find(x => x.name === name)).toBeUndefined()
			} else {
				expect(actual.find(x => x.name === name)).toEqual({ name, level: logLevels[name] })
			}
		})
	})
	it('include custom level (even if they have the same level value as one of the default level)', () => {
		const store = logLevelStore({
			customLevels: {
				info_a: 301,
				info_b: logLevels.info
			}
		})
		const actual = store.getAllLevels()
		expect(actual.find(x => x.name === 'info_a')).toEqual({ name: 'info_a', level: 301 })
		expect(actual.find(x => x.name === 'info_b')).toEqual({ name: 'info_b', level: logLevels.info })
	})
})
