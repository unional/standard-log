import a from 'assertron';
import { createMemoryLogReporter } from 'standard-log-memory';
import { getLogReporter } from '.';
import { config } from './config';
import { ProhibitedDuringProduction } from './errors';
import { addLogReporter } from './LogReporter';
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
