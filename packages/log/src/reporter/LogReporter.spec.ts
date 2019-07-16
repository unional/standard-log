import a from 'assertron';
import { addLogReporter, config, getLogReporter, ProhibitedDuringProduction } from '..';
import { resetStore } from '../store';
import { createMemoryLogReporter } from '../test-util';

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
