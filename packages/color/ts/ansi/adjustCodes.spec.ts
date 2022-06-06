import { adjustCodes } from './adjustCodes.js'
import { ANSI_BACKGROUND, ANSI_BLACK, ANSI_FOREGROUND, ANSI_RED, ANSI_WHITE, ANSI_YELLOW } from './constants.js'

test('error on red changes foreground to black', () => {
  expect(adjustCodes([ANSI_RED + ANSI_BACKGROUND, ANSI_WHITE + ANSI_FOREGROUND], 'error')).toEqual([ANSI_RED + ANSI_BACKGROUND, ANSI_BLACK + ANSI_FOREGROUND])
  expect(adjustCodes([ANSI_RED + ANSI_BACKGROUND], 'error')).toEqual([ANSI_RED + ANSI_BACKGROUND, ANSI_BLACK + ANSI_FOREGROUND])
})

test('warn on yellow changes foreground to black', () => {
  expect(adjustCodes([ANSI_YELLOW + ANSI_BACKGROUND, ANSI_WHITE + ANSI_FOREGROUND], 'warn')).toEqual([ANSI_YELLOW + ANSI_BACKGROUND, ANSI_BLACK + ANSI_FOREGROUND])
  expect(adjustCodes([ANSI_YELLOW + ANSI_BACKGROUND], 'warn')).toEqual([ANSI_YELLOW + ANSI_BACKGROUND, ANSI_BLACK + ANSI_FOREGROUND])
})
