import { logLevel } from 'standard-log';
import { toSyslogKeyword, toSyslogSeverity } from '.';
import { toSyslogLevel } from './syslog';
import { rangeEntries } from './test-util';

describe('toSyslogSeverity()', () => {
  test.each([
    ...rangeEntries(1, 19, 'emergency'),
    ...rangeEntries(20, 29, 'alert'),
    ...rangeEntries(30, 39, 'critical'),
    ...rangeEntries(40, 49, 'error'),
    ...rangeEntries(50, 59, 'warning'),
    ...rangeEntries(60, 69, 'notice'),
    ...rangeEntries(70, 79, 'informational'),
    ...rangeEntries(80, 90, 'debug')
  ])('convert %i to %s', (level: number, severity: string) => {
    expect(toSyslogSeverity(level)).toBe(severity)
  })
})

describe('toSyslogKeyword()', () => {
  test.each([
    ...rangeEntries(1, 19, 'emerg'),
    ...rangeEntries(20, 29, 'alert'),
    ...rangeEntries(30, 39, 'crit'),
    ...rangeEntries(40, 49, 'err'),
    ...rangeEntries(50, 59, 'warning'),
    ...rangeEntries(60, 69, 'notice'),
    ...rangeEntries(70, 79, 'info'),
    ...rangeEntries(80, 90, 'debug')
  ])('convert %i to %s', (level: number, keyword: string) => {
    expect(toSyslogKeyword(level)).toBe(keyword)
  })
})

describe('toSyslogLevel()', () => {
  test.each([
    [logLevel.emergency, 0],
    [logLevel.alert, 1],
    [logLevel.critical, 2],
    [logLevel.error, 3],
    [logLevel.warn, 4],
    [logLevel.notice, 5],
    [logLevel.info, 6],
    [logLevel.debug, 7]
  ])(`convert %i to %i`, (level: number, syslogLevel: number) => {
    expect(toSyslogLevel(level)).toBe(syslogLevel)
  })
});
