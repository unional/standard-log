import { test } from 'ava'
import { MemoryAppender } from 'aurelia-logging-memory'

import { addAppender, clearAppenders, getLogger, setLevel, logLevel, setDefaultAppender } from '.'

test.afterEach(() => {
  clearAppenders()
})

test('no default and no appender, nothing happens', t => {
  const log = getLogger('noAppender')
  log.info('no info')
  t.pass()
})

test('no effect if there is an appender', t => {
  const def = new MemoryAppender()
  setDefaultAppender(def)

  const mem = new MemoryAppender()
  addAppender(mem)

  setLevel(logLevel.info)
  const log = getLogger('def')

  log.info('test')

  t.is(mem.logs.length, 1)
  t.is(def.logs.length, 0)
})

test('will be used if there is no appender', t => {
  const def = new MemoryAppender()
  setDefaultAppender(def)

  setLevel(logLevel.info)
  const log = getLogger('def')

  log.info('test')

  t.is(def.logs.length, 1)
})
