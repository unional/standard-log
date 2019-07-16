import a from 'assertron';
import { createMemoryLogReporter } from 'standard-log-memory';
import { getLogReporter } from '.';
import { config } from './config';
import { ProhibitedDuringProduction } from './errors';
import { addLogReporter } from './LogReporter';
import { resetStore } from './store';

describe('getLogReporter()', () => {
  test('get reporter by id', () => {
    const reporter = getLogReporter('plain')
    expect(reporter!.id).toBe('plain')
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
