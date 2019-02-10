import t from 'assert'
import { addAppender, setLevel, getLogger, logLevel, addCustomLevel } from 'aurelia-logging'
import { MemoryAppender, stringifyLogLevel } from './MemoryAppender'

test('MemoryAppender', () => {
  const appender = new MemoryAppender()
  addAppender(appender)

  // Ensure setLevel will affect loggers created afterwards
  setLevel(logLevel.error)
  const logger = getLogger('Memory')
  logger.debug('debug')
  logger.error('error', 'something wrong')
  logger.info('info')
  logger.warn('warn')
  t.strictEqual(appender.logs.length, 1)
  t.deepStrictEqual(appender.logs[0], { id: 'Memory', level: logLevel.error, messages: ['error', 'something wrong'] })

  setLevel(logLevel.info)
  logger.debug('debug')
  logger.error('error')
  logger.info('info')
  logger.warn('warn')
  t.strictEqual(appender.logs.length, 4)

  setLevel(logLevel.debug)
  logger.debug('debug')
  t.strictEqual(appender.logs.length, 5)
})

test('stringifyLogLevel', () => {
  // logLevel.none is not cover as it is not available in the log.
  t.strictEqual(stringifyLogLevel(logLevel.debug), 'DEBUG')
  t.strictEqual(stringifyLogLevel(logLevel.info), 'INFO')
  t.strictEqual(stringifyLogLevel(logLevel.warn), 'WARN')
  t.strictEqual(stringifyLogLevel(logLevel.error), 'ERROR')
})

test('add custom level will log entry', () => {
  const appender = new MemoryAppender()
  addAppender(appender)

  addCustomLevel('trace', 35)
  MemoryAppender.addCustomLevel('trace', 35)

  const log = getLogger('custom level')
  setLevel(34)
    ; (log as any)['trace']('should not trace')
  setLevel(36)
    ; (log as any)['trace']('tracing')

  t.strictEqual(appender.logs.length, 1)
  t.deepStrictEqual(appender.logs[0], { id: 'custom level', level: 35, messages: ['tracing'] })
})

test('add custom level will stringify', () => {
  addCustomLevel('trace2', 45)
  t.strictEqual(stringifyLogLevel(45), 'TRACE2')
})
