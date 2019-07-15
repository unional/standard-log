import t from 'assert';
import { createMemoryLogReporter, MemoryLogReporter } from 'standard-log-memory';
import { getLogger, logLevel, setLogLevel, setLogLevels } from '.';
import { resetStore, store } from './store';

function createFilterLoggers() {
  for (let i = 0; i < 20; i++) {
    getLogger('filter' + i)
    getLogger('filter-' + String.fromCharCode(97 + i))
  }
}

let reporter: MemoryLogReporter
beforeAll(() => {
  createFilterLoggers()
})

beforeEach(() => {
  reporter = createMemoryLogReporter()
  store.get().reporters = [reporter]
  setLogLevel(logLevel.none)
})

afterAll(() => {
  resetStore()
})

test('no matched logger do no harm', () => {
  setLogLevels(/x/, logLevel.debug)
  const log = getLogger('filter1')
  log.debug('abc')

  t.deepStrictEqual(reporter.logs, [])
})

test('only filtered log are affected', () => {
  const logs = setLogLevels(/filter1/, logLevel.debug)
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

  t.strictEqual(reporter.logs.length, 2)
})