import { RED, BACKGROUND, YELLOW, BLACK, FOREGROUND } from './constants';

export function adjustCodes(codes: number[], consoleMethod: string) {
  if (
    (consoleMethod === 'error' && codes[0] === RED + BACKGROUND) ||
    (consoleMethod === 'warn' && codes[0] === YELLOW + BACKGROUND)
  ) {
    const altCodes = [...codes]
    altCodes[1] = BLACK + FOREGROUND
    return altCodes
  }
  return codes
}
