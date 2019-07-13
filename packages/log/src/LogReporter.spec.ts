import { getLogReporter } from '.';
import { config } from './config';
import { resetStore } from './store';
import a from 'assertron'
import { addLogReporter } from './LogReporter';
import { createMemoryLogReporter } from 'standard-log-memory';
import { ProhibitedDuringProduction } from './errors';

describe('getLogReporter()', () => {
  test('get reporter by id', () => {
    const reporter = getLogReporter('console')

    expect(reporter!.id).toBe('console')
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
