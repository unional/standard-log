import { ANSI_BACKGROUND, ANSI_FOREGROUND, ANSI_RED } from './constants.js'
import { wrapAnsiId } from './wrapAnsi.js'

test('no background will not pad', () => {
  const actual = wrapAnsiId('abc', [ANSI_RED + ANSI_FOREGROUND])
  expect(actual).toBe(`\u001B[${ANSI_RED + ANSI_FOREGROUND}m${'abc'}\u001B[0m`)
})

it('will pad with background', () => {
  const actual = wrapAnsiId('abc', [ANSI_RED + ANSI_BACKGROUND])
  expect(actual).toBe(`\u001B[${ANSI_RED + ANSI_BACKGROUND}m${' abc '}\u001B[0m`)
})
