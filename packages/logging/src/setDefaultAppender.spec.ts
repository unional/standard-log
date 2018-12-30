import t from 'assert';
import { MemoryAppender } from 'aurelia-logging-memory';
import { addAppender, clearAppenders, getLogger, logLevel, setDefaultAppender, setLevel } from '.';


afterEach(() => {
  clearAppenders()
})

test('no appender will invoke the default appender', () => {
  const log = getLogger('noAppender', logLevel.debug)
  log.error('error message to default appender (SimpleConsoleAppender)')
  log.info('info message to default appender (SimpleConsoleAppender)')
  log.warn('warn message to default appender (SimpleConsoleAppender)')
  log.debug('debug message to default appender (SimpleConsoleAppender)')
})

test('no effect if there is an appender', () => {
  const def = new MemoryAppender()
  setDefaultAppender(def)

  const mem = new MemoryAppender()
  addAppender(mem)

  setLevel(logLevel.info)
  const log = getLogger('def')

  log.info('test')

  t.strictEqual(mem.logs.length, 1)
  t.strictEqual(def.logs.length, 0)
})

test('will be used if there is no appender', () => {
  const def = new MemoryAppender()
  setDefaultAppender(def)

  setLevel(logLevel.info)
  const log = getLogger('def')

  log.info('test')

  t.strictEqual(def.logs.length, 1)
})
