import { createMemoryLogReporter, getLogReporter } from '.';
import { store } from './store';

describe('getLogReporter()', () => {
  test('get reporter by id', () => {
    store.value.reporters = [createMemoryLogReporter({ id: 'get-reporter' })]
    const reporter = getLogReporter('get-reporter')
    expect(reporter!.id).toBe('get-reporter')
  })

  test('get unknown reporter gets undefined', () => {
    expect(getLogReporter('abc')).toBeUndefined()
  })
})
