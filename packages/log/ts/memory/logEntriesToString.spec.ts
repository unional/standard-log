import { logLevels, logEntriesToString } from '../index.js'

test('convert log entries to string', () => {
  const timestamp = new Date(2019, 6)
  const actual = logEntriesToString([
    { id: 'log', level: logLevels.emergency, args: ['emergency'], timestamp },
    { id: 'log', level: logLevels.critical, args: ['critical'], timestamp },
    { id: 'log', level: logLevels.alert, args: ['alert'], timestamp },
    { id: 'log', level: logLevels.error, args: ['error'], timestamp },
    { id: 'log', level: logLevels.warn, args: ['warn'], timestamp },
    { id: 'log', level: logLevels.notice, args: ['notice'], timestamp },
    { id: 'log', level: logLevels.info, args: ['info'], timestamp },
    { id: 'log', level: logLevels.debug, args: ['debug'], timestamp },
    { id: 'log', level: logLevels.trace, args: ['trace'], timestamp }
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

test('print out object', () => {
  const timestamp = new Date(2021, 4)
  const actual = logEntriesToString([
    { id: 'log', level: logLevels.info, args: ['a', { a: 1 }], timestamp }
  ])

  const iso = timestamp.toISOString()
  expect(actual).toEqual(`${iso},log,(INFO),a,{ a: 1 }`)
})

test('print out array', () => {
  const timestamp = new Date(2021, 4)
  const actual = logEntriesToString([
    { id: 'log', level: logLevels.info, args: ['a', [1, 2, 3]], timestamp }
  ])

  const iso = timestamp.toISOString()
  expect(actual).toEqual(`${iso},log,(INFO),a,[ 1, 2, 3 ]`)
})
