import a from 'assertron';
import { addLogReporter, config, createMemoryLogReporter, getLogReporter, ProhibitedDuringProduction } from '.';
import { store } from './store';

beforeAll(() => {
  config({ mode: 'test' })
})

describe('getLogReporter()', () => {
  test('get reporter by id', () => {
    addLogReporter(createMemoryLogReporter({ id: 'get-reporter' }))
    const reporter = getLogReporter('get-reporter')
    expect(reporter!.id).toBe('get-reporter')
  })

  test('get unknown reporter gets undefined', () => {
    expect(getLogReporter('abc')).toBeUndefined()
  })
})

describe('addLogReporter()', () => {
  afterEach(() => {
    store.reset()
  })

  test('throw Prohibited in production mode', () => {
    config({ mode: 'prod' })
    a.throws(() => addLogReporter(createMemoryLogReporter()), ProhibitedDuringProduction)
  })
})
