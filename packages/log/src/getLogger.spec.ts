import a from 'assertron';
import { addCustomLogLevel, clearCustomLogLevel, LogLevel, logLevel } from 'standard-log-core';
import { createMemoryLogReporter } from 'standard-log-memory';
import { config, getLogger, InvalidId } from '.';
import { resetStore } from './store';

afterEach(() => {
  clearCustomLogLevel()
  resetStore()
})

test('logger id supports alphanumeric and :_-.', () => {
  getLogger('abcdefghijklmnopqrstuvwxyz:-_.1234567890')
})

test('logger id supports unicode', () => {
  getLogger('ミク香港')
})

test.each('`~!@#$%^&*()=+\\/|[]{}<>,?'.split(''))('throws if id has unsupported character %s', (char: string) => {
  a.throws(() => getLogger(char), InvalidId)
})

test('logger with custom level', () => {
  const reporter = createMemoryLogReporter()
  config({ reporters: [reporter] })
  addCustomLogLevel('cust_lvl', 100)
  const logger = getLogger<LogLevel | 'cust_lvl'>('cust')

  logger.cust_lvl('a', 'b')

  a.satisfies(reporter.logs, [{ id: 'cust', level: 100, args: ['a', 'b'] }])
})

test('get logger with same name gets the same instance', () => {
  const expected = getLogger('same-inst')
  const actual = getLogger('same-inst')
  expect(actual).toBe(expected)
})

test('new logger will get custom level', () => {
  addCustomLogLevel('to_logger', 1234)
  const actual = getLogger<LogLevel | 'to_logger'>('to_logger_logger')
  expect(typeof actual.to_logger).toBe('function')
})

test('existing logger will get custom level', () => {
  const actual = getLogger<LogLevel | 'old_logger'>('old_logger')
  addCustomLogLevel('old_logger', 122)
  expect(typeof actual.old_logger).toBe('function')
})

describe('inc()', () => {
  test('inc() will increment the counter', () => {
    const reporter = createMemoryLogReporter()
    config({ reporters: [reporter], logLevel: logLevel.debug })
    const logger = getLogger('inc counter')
    logger.inc()
    logger.inc()

    a.satisfies(reporter.logs, [
      { id: 'inc counter', level: logLevel.debug, args: [1] },
      { id: 'inc counter', level: logLevel.debug, args: [2] }
    ])
  })

  test('inc() will append args after the counter', () => {
    const reporter = createMemoryLogReporter({ id: 'dum' })
    config({ reporters: [reporter], logLevel: logLevel.debug })
    const id = 'inc with args';
    const logger = getLogger(id)
    logger.inc('msg1', 'msg2')
    logger.inc('msg3', 'msg4')

    a.satisfies(reporter.logs, [
      { id, level: logLevel.debug, args: [1, 'msg1', 'msg2'] },
      { id, level: logLevel.debug, args: [2, 'msg3', 'msg4'] }
    ])
  })
})