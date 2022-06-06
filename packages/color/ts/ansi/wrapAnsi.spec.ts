import { wrapAnsi } from './wrapAnsi.js'
import { ANSI_RED, ANSI_FOREGROUND } from './constants.js'

test('no background will not pad', () => {
  const actual = wrapAnsi('abc', [ANSI_RED + ANSI_FOREGROUND])
  expect(actual).toBe(`\u001B[${ANSI_RED + ANSI_FOREGROUND}m${'abc'}\u001B[0m`)
})
