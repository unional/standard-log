import { adjustCodes } from './adjustCodes';
import { BACKGROUND, BLACK, FOREGROUND, RED, WHITE, YELLOW } from './constants';

test('error on red changes foreground to black', () => {
  expect(adjustCodes([RED + BACKGROUND, WHITE + FOREGROUND], 'error')).toEqual([RED + BACKGROUND, BLACK + FOREGROUND])
  expect(adjustCodes([RED + BACKGROUND], 'error')).toEqual([RED + BACKGROUND, BLACK + FOREGROUND])
})

test('warn on yellow changes foreground to black', () => {
  expect(adjustCodes([YELLOW + BACKGROUND, WHITE + FOREGROUND], 'warn')).toEqual([YELLOW + BACKGROUND, BLACK + FOREGROUND])
  expect(adjustCodes([YELLOW + BACKGROUND], 'warn')).toEqual([YELLOW + BACKGROUND, BLACK + FOREGROUND])
})
