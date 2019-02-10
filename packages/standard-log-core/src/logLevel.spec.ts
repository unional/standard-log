import { toLogLevel } from '.';
import { rangeEntries } from './testUtil';

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
})
