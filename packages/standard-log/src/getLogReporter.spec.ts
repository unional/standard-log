import { getLogReporter } from './getLogReporter';

test('get reporter by id', () => {
  const reporter = getLogReporter('default')

  expect(reporter!.id).toBe('default')
})

test('get unknown reporter gets undefined', () => {
  expect(getLogReporter('abc')).toBeUndefined()
})
