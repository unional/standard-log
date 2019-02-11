import { addCustomLogLevel, clearCustomLogLevel, toLogLevel, toLogLevelName } from '.';
import { store } from './store';
import { rangeEntries } from './testUtil';

describe('toLogLevelName()', () => {
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
    expect(toLogLevelName(level)).toBe(logLevel)
  })
  test('get custom log level name', () => {
    addCustomLogLevel('cust-name', 30)
    expect(toLogLevelName(30)).toBe('cust-name')
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
      toLogLevel('trace')]
    expect(actual).toEqual([
      10, 20, 30, 40, 50, 60, 70, 80, 90
    ])
  })

  test('get custom log level', () => {
    addCustomLogLevel('cust-get', 123)
    expect(toLogLevel('cust-get')).toBe(123)
  })
})

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', 1)
    addCustomLogLevel('c2', 2)
    clearCustomLogLevel()
    const { customLevels, customLevelsReverse } = store.get()
    expect(customLevels.size).toBe(0)
    expect(customLevelsReverse.length).toBe(0)
  })
})
