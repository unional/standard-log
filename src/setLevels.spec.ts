import t from 'assert';
import { MemoryAppender } from 'aurelia-logging-memory';
import { addAppender, getLogger, logLevel, removeAppender, setLevel, setLevels } from '.';

function createFilterLoggers() {
  for (let i = 0; i < 20; i++) {
    getLogger('filter' + i)
    getLogger('filter-' + String.fromCharCode(97 + i))
  }
}

let appender: MemoryAppender
beforeAll(() => {
  createFilterLoggers()
  appender = new MemoryAppender()
  addAppender(appender)
})

beforeEach(() => {
  setLevel(logLevel.none)
})

afterEach(() => {
  appender.logs = []
})

afterAll(() => {
  removeAppender(appender)
})

test('no matched logger do no harm', () => {
  setLevels(/x/, logLevel.debug)
  const log = getLogger('filter1')
  log.debug('abc')

  t.deepStrictEqual(appender.logs, [])
})

test('only filtered log are affected', () => {
  const logs = setLevels(/filter1/, logLevel.debug)
  t.deepStrictEqual(logs.map(l => l.id), [
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

  t.strictEqual(appender.logs.length, 2)
})
