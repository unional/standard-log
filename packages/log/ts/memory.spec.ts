import a from 'assertron'
import { createMemoryLogReporter, LogEntry, LogFilter, LogFormatter, logLevels } from './index.js'
import { assertSSF, logEntriesToString } from './testUtil.js'
import { filename } from 'dirname-filename-esm'

const mikuIsSinging = { id: 'test-log', level: logLevels.info, args: ['miku', 'is', 'singing'], timestamp: new Date() }
const lukaIsDancing = { id: 'test-log', level: logLevels.warn, args: ['luka', 'is', 'dancing'], timestamp: new Date() }
const reporter = createMemoryLogReporter()

describe(createMemoryLogReporter.name, () => {
  it('filter is readonly', () => {
    const reporter = createMemoryLogReporter()
    const err = a.throws(() => { (reporter as any).filter = () => true }, err => /only a getter/.test(err))

    assertSSF(err, filename(import.meta))
  })

  test('log entries are saved in the `logs` property', () => {
    const reporter = createMemoryLogReporter()
    const entry = { id: 'log', level: 1, args: ['some messages'], timestamp: new Date() }
    reporter.write(entry)
    expect(reporter.logs).toEqual([entry])
  })

  test('can override id', () => {
    const reporter = createMemoryLogReporter({ id: 'custom-id-mem' })
    expect(reporter.id).toBe('custom-id-mem')
  })

  test('can filter', () => {
    const filter: LogFilter = (entry) => entry.id !== 'secret'
    const reporter = createMemoryLogReporter({ filter })
    expect(reporter.filter).toBe(filter)
    reporter.write({ id: 'ok', level: 1, args: ['some messages'], timestamp: new Date() })
    reporter.write({ id: 'secret', level: 1, args: ['some messages'], timestamp: new Date() })
    expect(reporter.logs.length).toBe(1)
  })

  test('formatter can be used to pre-process the log', () => {
    const formatter: LogFormatter<LogEntry> = (entry) => ({
      ...entry,
      args: entry.args.map(arg => arg === 'secret' ? '<censored>' : arg)
    })
    const reporter = createMemoryLogReporter({ formatter })
    expect(reporter.formatter).toBe(formatter)

    const entry = { id: 'log', level: 1, args: ['a', 'secret', 'b'], timestamp: new Date() }
    reporter.write(entry)

    expect(reporter.logs[0].args[1]).toBe('<censored>')
  })

  describe(reporter.getLogMessages.name, () => {
    it('maps each log entries to string', () => {
      const r = createMemoryLogReporter()
      r.write(mikuIsSinging)
      r.write(lukaIsDancing)
      expect(r.getLogMessages()).toEqual([
        'miku is singing',
        'luka is dancing'
      ])
    })
  })

  describe(reporter.getLogMessage.name, () => {
    test('empty logs returns empty string', () => {
      const reporter = createMemoryLogReporter()

      expect(reporter.getLogMessage()).toEqual('')
    })

    test('print args', () => {
      const reporter = createMemoryLogReporter()
      const entry = { id: 'log', level: 1, args: ['miku', 'is', 'singing'], timestamp: new Date() }
      reporter.write(entry)
      expect(reporter.getLogMessage()).toEqual('miku is singing')
    })

    test('print object arg', () => {
      const reporter = createMemoryLogReporter()
      const entry = { id: 'log', level: 1, args: [{ 'miku': 'sing' }], timestamp: new Date() }
      reporter.write(entry)
      expect(reporter.getLogMessage()).toEqual("{ miku: 'sing' }")
    })
  })

  describe(reporter.getLogMessageWithLevel.name, () => {
    test('print with level', () => {
      const reporter = createMemoryLogReporter()
      reporter.write({ id: 'log', level: logLevels.info, args: ['msg 1'], timestamp: new Date() })
      reporter.write({ id: 'log', level: logLevels.warn, args: ['msg 2'], timestamp: new Date() })
      expect(reporter.getLogMessageWithLevel()).toEqual(`(INFO) msg 1\n(WARN) msg 2`)
    })
  })

  describe(reporter.getLogMessagesWithIdAndLevel.name, () => {
    it('does what the name says', () => {
      const r = createMemoryLogReporter()
      r.write(mikuIsSinging)
      r.write(lukaIsDancing)
      expect(r.getLogMessagesWithIdAndLevel()).toEqual([
        'test-log (INFO) miku is singing',
        'test-log (WARN) luka is dancing'
      ])
    })
  })

  describe(reporter.emit.name, () => {
    it('emit saved logs to console', () => {
      const r = createMemoryLogReporter()
      r.write(mikuIsSinging)
      r.write(lukaIsDancing)
      r.write({ id: 'test-log', level: logLevels.info, args: ['the two messages above are expected'], timestamp: new Date() })

      // inspect visually
      r.emit()
    })
  })
})

describe(logEntriesToString.name, () => {
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
})
