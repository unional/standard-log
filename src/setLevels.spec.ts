import test from 'ava'
import { MemoryAppender } from 'aurelia-logging-memory'

import { getLogger, setLevels, setLevel, logLevel, addAppender, removeAppender } from './index'

function createFilterLoggers() {
  for (let i = 0; i < 20; i++) {
    getLogger('filter' + i)
    getLogger('filter-' + String.fromCharCode(97 + i))
  }
}

let appender: MemoryAppender
test.before(() => {
  createFilterLoggers()
  appender = new MemoryAppender()
  addAppender(appender)
})

test.beforeEach(() => {
  setLevel(logLevel.none)
})

test.afterEach(() => {
  appender.logs = []
})

test.after(() => {
  removeAppender(appender)
})

test('no matched logger do no harm', t => {
  setLevels(/x/, logLevel.debug)
  const log = getLogger('filter1')
  log.debug('abc')

  t.deepEqual(appender.logs, [])
})

test('only filtered log are affected', t => {
  const logs = setLevels(/filter1/, logLevel.debug)
  t.deepEqual(logs.map(l => l.id), [
    'filter1',
    'filter10',
    'filter11',
    'filter12',
    'filter13',
    'filter14',
    'filter15',
    'filter16',
    'filter17',
    'filter18',
    'filter19'
  ])

  getLogger('filter1').debug('filter1')
  getLogger('filter2').debug('filter2')
  getLogger('filter11').debug('filter11')

  t.is(appender.logs.length, 2)
})
