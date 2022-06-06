import { semverGt } from './semverGt.js'

test('9.3.0 returns false', () => {
  expect(semverGt('9.3.0', [9, 3, 0])).toBe(false)
})

test('9.3.1 returns true', () => {
  expect(semverGt('9.3.1', [9, 3, 0])).toBe(true)
})

test('9.3.1 returns true', () => {
  expect(semverGt('9.3.1', [9, 3, 0])).toBe(true)
})

test('9.4.0 returns true', () => {
  expect(semverGt('9.4.0', [9, 3, 0])).toBe(true)
})

test('9.10.0 returns true', () => {
  expect(semverGt('9.10.0', [9, 3, 0])).toBe(true)
})

test('10.0.0 returns true', () => {
  expect(semverGt('10.0.0', [9, 3, 0])).toBe(true)
})
