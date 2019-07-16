import a from 'assertron';
import { addLogReporter, config, getLogReporter, ProhibitedDuringProduction } from '..';
import { resetStore } from '../store';
import { createMemoryLogReporter } from '../test-util';

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
    resetStore()
  })

  test('throw Prohibited in production mode', () => {
    config({ mode: 'prod' })
    a.throws(() => addLogReporter(createMemoryLogReporter()), ProhibitedDuringProduction)
  })
})
