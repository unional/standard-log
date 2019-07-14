import { wrapAnsi } from './wrapAnsi';
import { ANSI_RED, ANSI_FOREGROUND } from './constants';

test('no background will not pad', () => {
  const actual = wrapAnsi('abc', [ANSI_RED + ANSI_FOREGROUND])
  expect(actual).toBe(`\u001B[${ANSI_RED + ANSI_FOREGROUND}m${'abc'}\u001B[0m`)
})
