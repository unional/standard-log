import { toLogLevel } from '.';
import { rangeEntries } from './testUtil';
import { getLogLevel, addCustomLogLevel } from './LogLevel';

describe('toLogLevel()', () => {
  test.each([
    ...rangeEntries(1, 19, 'emergency'),
    ...rangeEntries(20, 29, 'alert'),
    ...rangeEntries(30, 39, 'critical'),
    ...rangeEntries(40, 49, 'error'),
    ...rangeEntries(50, 59, 'warn'),
    ...rangeEntries(60, 69, 'notice'),
    ...rangeEntries(70, 79, 'info'),
    ...rangeEntries(80, 89, 'debug'),
    ...rangeEntries(90, 100, 'trace')
  ])('convert %i to %s', (level: number, logLevel: string) => {
    expect(toLogLevel(level)).toBe(logLevel)
  })
  test('get custom log level name', () => {
    addCustomLogLevel('cust-name', 30)
    expect(toLogLevel(30)).toBe('cust-name')
  })
})

describe('getLogLevel()', () => {
  test('get default log levels', () => {
    const actual = [
      getLogLevel('emergency'),
      getLogLevel('alert'),
      getLogLevel('critical'),
      getLogLevel('error'),
      getLogLevel('warn'),
      getLogLevel('notice'),
      getLogLevel('info'),
      getLogLevel('debug'),
      getLogLevel('trace')]
    expect(actual).toEqual([
      10, 20, 30, 40, 50, 60, 70, 80, 90
    ])
  })

  test('get custom log level', () => {
    addCustomLogLevel('cust-get', 123)
    expect(getLogLevel('cust-get')).toBe(123)
  })
})
