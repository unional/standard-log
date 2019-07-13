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

  const iso = timestamp.toISOString()
  expect(actual).toEqual(`${iso},log,(EMERGENCY),emergency
${iso},log,(CRITICAL),critical
${iso},log,(ALERT),alert
${iso},log,(ERROR),error
${iso},log,(WARN),warn
${iso},log,(NOTICE),notice
${iso},log,(INFO),info
${iso},log,(DEBUG),debug
${iso},log,(TRACE),trace`)
})
