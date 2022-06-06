import { logLevels } from 'standard-log'
import { toSyslogKeyword, toSyslogSeverity } from './index.js'
import { toSyslogLevel } from './syslog.js'
import { rangeEntries } from './test-util/index.js'

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
