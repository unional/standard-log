import test from 'ava'
import { addAppender, setLevel, getLogger, logLevel, addCustomLevel } from 'aurelia-logging'
import { MemoryAppender, stringifyLogLevel } from './index'

test('MemoryAppender', t => {
  const appender = new MemoryAppender()
  addAppender(appender)

  // Ensure setLevel will affect loggers created afterwards
  setLevel(logLevel.error)
  const logger = getLogger('Memory')
  logger.debug('debug')
  logger.error('error', 'something wrong')
  logger.info('info')
  logger.warn('warn')
  t.is(appender.logs.length, 1)
  t.deepEqual(appender.logs[0], { id: 'Memory', level: logLevel.error, messages: ['error', 'something wrong'] })

  setLevel(logLevel.info)
  logger.debug('debug')
  logger.error('error')
  logger.info('info')
  logger.warn('warn')
  t.is(appender.logs.length, 4)

  setLevel(logLevel.debug)
  logger.debug('debug')
  t.is(appender.logs.length, 5)
})

test('stringifyLogLevel', t => {
  // logLevel.none is not cover as it is not available in the log.
  t.is(stringifyLogLevel(logLevel.debug), 'DEBUG')
  t.is(stringifyLogLevel(logLevel.info), 'INFO')
  t.is(stringifyLogLevel(logLevel.warn), 'WARN')
  t.is(stringifyLogLevel(logLevel.error), 'ERROR')
})

test('add custom level will log entry', t => {
  const appender = new MemoryAppender()
  addAppender(appender)

  addCustomLevel('trace', 35)
  MemoryAppender.addCustomLevel('trace', 35)

  const log = getLogger('custom level')
  setLevel(34)
  log['trace']('should not trace')
  setLevel(36)
  log['trace']('tracing')

  t.is(appender.logs.length, 1)
  t.deepEqual(appender.logs[0], { id: 'custom level', level: 35, messages: ['tracing'] })
})

test('add custom level will stringify', t => {
  addCustomLevel('trace2', 45)
  t.is(stringifyLogLevel(45), 'TRACE2')
})
