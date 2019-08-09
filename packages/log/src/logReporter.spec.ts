import a from 'assertron';
import { addLogReporter, clearLogReporters, config, createMemoryLogReporter, getLogReporter, ProhibitedDuringProduction } from '.';
import { store } from './store';

beforeEach(() => {
  store.reset()
  config({ mode: 'test' })
})

describe('addLogReporter()', () => {
  test('throws in production mode', () => {
    config({ mode: 'production' })
    const reporter = createMemoryLogReporter()
    a.throws(() => addLogReporter(reporter), ProhibitedDuringProduction)
  })

  test('adds log reporter', () => {
    const count = store.value.reporters.length
    const reporter = createMemoryLogReporter()
    addLogReporter(reporter)

    expect(store.value.reporters.length).toBe(count + 1)
  })
})

describe('getLogReporter()', () => {
  test('get log reporter by id', () => {
    expect(getLogReporter('console')).toBeDefined()
  })

  test('get log reporter with unknown id gets undefined', () => {
    expect(getLogReporter('blah')).toBeUndefined()
  })
})

describe('clearLogReporters()', () => {
  test('throws in production mode', () => {
    config({ mode: 'production' })
    a.throws(() => clearLogReporters(), ProhibitedDuringProduction)
  })

  test('removes all reporters', () => {
    clearLogReporters()

    expect(store.value.reporters.length).toBe(0)
  })
})
