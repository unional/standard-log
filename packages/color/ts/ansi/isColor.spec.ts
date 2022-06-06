import { ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_FOREGROUND, ANSI_RED, ANSI_WHITE } from './constants.js'
import { isColor } from './isColor.js'

test('support duo code', () => {
  expect(isColor([ANSI_RED + ANSI_BACKGROUND, ANSI_WHITE + ANSI_FOREGROUND], ANSI_WHITE, ANSI_RED)).toBe(true)
})

test('support single code', () => {
  expect(isColor([ANSI_RED + ANSI_BACKGROUND], ANSI_WHITE, ANSI_RED)).toBe(true)
})

test('support triple code', () => {
  expect(isColor([ANSI_RED + ANSI_BACKGROUND, ANSI_WHITE + ANSI_FOREGROUND, ANSI_BRIGHT], ANSI_WHITE, ANSI_RED)).toBe(true)
})

test('specific style', () => {
  expect(isColor([ANSI_RED + ANSI_BACKGROUND, ANSI_WHITE + ANSI_FOREGROUND, ANSI_BRIGHT], ANSI_WHITE, ANSI_RED, ANSI_BRIGHT)).toBe(true)
})
