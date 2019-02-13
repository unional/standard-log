import { addCustomLogLevel, clearCustomLogLevel, toLogLevel, toLogLevelName } from '.';
import { rangeEntries } from './testUtil';

describe('toLogLevelName()', () => {
  test.each([
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
    expect(toLogLevelName(level)).toBe(logLevel)
  })

  test('get custom log level name', () => {
    addCustomLogLevel('cust-name', 144)
    expect(toLogLevelName(144)).toBe('cust-name')
  })
})

describe('toLogLevel()', () => {
  afterEach(() => clearCustomLogLevel())
  test('get default log levels', () => {
    const actual = [
      toLogLevel('emergency'),
      toLogLevel('alert'),
      toLogLevel('critical'),
      toLogLevel('error'),
      toLogLevel('warn'),
      toLogLevel('notice'),
      toLogLevel('info'),
      toLogLevel('debug'),
      toLogLevel('trace'),
      toLogLevel('planck')
    ]
    expect(actual).toEqual([
      100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity
    ])
  })

  test('get custom log level', () => {
    addCustomLogLevel('cust-get', 123)
    expect(toLogLevel('cust-get')).toBe(123)
  })
})
