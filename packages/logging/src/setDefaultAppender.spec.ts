import t from 'assert';
import { MemoryAppender } from 'aurelia-logging-memory';
import { addAppender, clearAppenders, getLogger, logLevel, setDefaultAppender, setLevel } from '.';


afterEach(() => {
  clearAppenders()
})

test('no default and no appender, nothing happens', () => {
  const log = getLogger('noAppender')
  log.info('no info')
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
