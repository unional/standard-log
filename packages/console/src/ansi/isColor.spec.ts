import { BACKGROUND, BRIGHT, FOREGROUND, RED, WHITE } from './constants';
import { isColor } from './isColor';

test('support duo code', () => {
  expect(isColor([RED + BACKGROUND, WHITE + FOREGROUND], WHITE, RED)).toBe(true)
})

test('support single code', () => {
  expect(isColor([RED + BACKGROUND], WHITE, RED)).toBe(true)
})

test('support triple code', () => {
  expect(isColor([RED + BACKGROUND, WHITE + FOREGROUND, BRIGHT], WHITE, RED)).toBe(true)
})

test('specific style', () => {
  expect(isColor([RED + BACKGROUND, WHITE + FOREGROUND, BRIGHT], WHITE, RED, BRIGHT)).toBe(true)
})
