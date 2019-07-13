import { logLevel } from 'standard-log-core';
import { logEntriesToString } from '.';

test('convert log entries to string', () => {
  const timestamp = new Date(2019, 6)
  const actual = logEntriesToString([
    { id: 'log', level: logLevel.emergency, args: ['emergency'], timestamp },
    { id: 'log', level: logLevel.critical, args: ['critical'], timestamp },
    { id: 'log', level: logLevel.alert, args: ['alert'], timestamp },
    { id: 'log', level: logLevel.error, args: ['error'], timestamp },
    { id: 'log', level: logLevel.warn, args: ['warn'], timestamp },
    { id: 'log', level: logLevel.notice, args: ['notice'], timestamp },
    { id: 'log', level: logLevel.info, args: ['info'], timestamp },
    { id: 'log', level: logLevel.debug, args: ['debug'], timestamp },
    { id: 'log', level: logLevel.trace, args: ['trace'], timestamp }
  ])

  expect(actual).toEqual(`2019-07-01T07:00:00.000Z,log,(EMERGENCY),emergency
2019-07-01T07:00:00.000Z,log,(CRITICAL),critical
2019-07-01T07:00:00.000Z,log,(ALERT),alert
2019-07-01T07:00:00.000Z,log,(ERROR),error
2019-07-01T07:00:00.000Z,log,(WARN),warn
2019-07-01T07:00:00.000Z,log,(NOTICE),notice
2019-07-01T07:00:00.000Z,log,(INFO),info
2019-07-01T07:00:00.000Z,log,(DEBUG),debug
2019-07-01T07:00:00.000Z,log,(TRACE),trace`)
})
