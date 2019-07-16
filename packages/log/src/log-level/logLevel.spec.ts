import t from 'assert';
import { forEachKey } from 'type-plus';
import { addCustomLogLevel, clearCustomLogLevel, config, getAllLogLevels, getLogger, getLogLevel, logLevel, setLogLevel, setLogLevels, toLogLevel, toLogLevelName } from '..';
import { resetStore, store } from '../store';
import { createMemoryLogReporter, MemoryLogReporter, rangeEntries } from '../test-util';

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

describe('getLogLevel', () => {
  test('default to debug in test mode', () => {
    config({ mode: 'test' })
    expect(getLogLevel()).toBe(logLevel.debug)
  })
})

describe('setLogLevels()', () => {
  beforeEach(() => {
    setLogLevel(logLevel.none)
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
})

describe('toLogLevelName()', () => {
  test.each([
    ...rangeEntries(99, 100, 'emergency'),
    ...rangeEntries(199, 200, 'alert'),
    ...rangeEntries(299, 300, 'critical'),
    ...rangeEntries(399, 400, 'error'),
    ...rangeEntries(499, 500, 'warn'),
    ...rangeEntries(599, 600, 'notice'),
    ...rangeEntries(699, 700, 'info'),
    ...rangeEntries(799, 800, 'debug'),
    ...rangeEntries(899, 900, 'trace'),
    ...rangeEntries(9999999, 10000000, 'planck')
  ])('convert %i to %s', (level: number, logLevel: string) => {
    expect(toLogLevelName(level)).toBe(logLevel)
  })

  test('get custom log level name', () => {
    addCustomLogLevel('cust-name', 144)
    expect(toLogLevelName(144)).toBe('cust-name')
  })
})

describe('toLogLevel()', () => {
  afterEach(() => clearCustomLogLevel())
  test('get default log levels', () => {
    const actual = [
      toLogLevel('emergency'),
      toLogLevel('alert'),
      toLogLevel('critical'),
      toLogLevel('error'),
      toLogLevel('warn'),
      toLogLevel('notice'),
      toLogLevel('info'),
      toLogLevel('debug'),
      toLogLevel('trace'),
      toLogLevel('planck')
    ]
    expect(actual).toEqual([
      100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity
    ])
  })

  test('get custom log level', () => {
    addCustomLogLevel('cust-get', 123)
    expect(toLogLevel('cust-get')).toBe(123)
  })
})

describe('getAllLogLevels', () => {
  test('get all default log levels except none and all', () => {
    const actual = getAllLogLevels()
    forEachKey(logLevel, name => {
      if (name === 'none' || name === 'all') {
        expect(actual.find(x => x.name === name)).toBeUndefined()
      }
      else {
        expect(actual.find(x => x.name === name)).toEqual({ name, level: logLevel[name] })
      }
    })
  })
  test('include custom level (even if they have the same level value as one of the default level)', () => {
    addCustomLogLevel('info_a', 301)
    addCustomLogLevel('info_b', logLevel.info)
    const actual = getAllLogLevels()
    expect(actual.find(x => x.name === 'info_a')).toEqual({ name: 'info_a', level: 301 })
    expect(actual.find(x => x.name === 'info_b')).toEqual({ name: 'info_b', level: logLevel.info })
  })
})