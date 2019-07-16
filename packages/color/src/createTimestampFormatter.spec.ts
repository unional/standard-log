import { createTimestampFormatter } from './createTimestampFormatter';

test('elasped', () => {
  const formatter = createTimestampFormatter('elasped')
  const now = new Date()
  const next = new Date(now.getTime() + 10)
  const actual = [formatter(now), formatter(next)]

  expect(actual).toEqual(['0ms', '10ms'])
})
