import a from 'assertron';
import { getLogger } from '.';
import { InvalidId } from './errors';
import { LogLevel, addCustomLogLevel, clearCustomLogLevel } from 'standard-log-core';
import { resetStore } from './store';
import { config } from './config';
import { createMemoryLogReporter } from '../../standard-log-memory/lib';

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
  config({
    reporters: [reporter]
  })
  addCustomLogLevel('cust_lvl', 100)
  const logger = getLogger<LogLevel | 'cust_lvl'>('cust')

  logger.cust_lvl('a', 'b')

  a.satisfies(reporter.logs, [{ loggerId: 'cust', level: 100, messages: ['a', 'b'] }])
})

test('get logger with same name gets the same instance', () => {
  const expected = getLogger('same-inst')
  const actual = getLogger('same-inst')
  expect(actual).toBe(expected)
})
