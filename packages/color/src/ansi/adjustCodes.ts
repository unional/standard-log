import { ANSI_RED, ANSI_BACKGROUND, ANSI_YELLOW, ANSI_BLACK, ANSI_FOREGROUND } from './constants';

export function adjustCodes(codes: number[], consoleMethod: string) {
  if (
    (consoleMethod === 'error' && codes[0] === ANSI_RED + ANSI_BACKGROUND) ||
    (consoleMethod === 'warn' && codes[0] === ANSI_YELLOW + ANSI_BACKGROUND)
  ) {
    const altCodes = [...codes]
    altCodes[1] = ANSI_BLACK + ANSI_FOREGROUND
    return altCodes
  }
  return codes
}
