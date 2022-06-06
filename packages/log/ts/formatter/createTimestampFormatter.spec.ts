import { createTimestampFormatter } from '../index.js'

test('none', () => {
  const formatter = createTimestampFormatter('none')
  const now = new Date()
  const actual = [formatter(now)]
  expect(actual).toEqual([undefined])
})

test('iso', () => {
  const formatter = createTimestampFormatter('iso')
  const now = new Date()
  const actual = [formatter(now)]
  expect(actual).toEqual([now.toISOString()])
})

test('elapsed', () => {
  const formatter = createTimestampFormatter('elapsed')
  const now = new Date()
  const next = new Date(now.getTime() + 10)
  const actual = [formatter(now), formatter(next)]

  expect(actual).toEqual(['0ms', '10ms'])
})
