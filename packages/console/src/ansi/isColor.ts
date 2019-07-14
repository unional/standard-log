import { AnsiColor, AnsiStyle, ANSI_BACKGROUND, ANSI_FOREGROUND, ANSI_WHITE } from './constants';

export function isColor(color: number[], foreground: AnsiColor, background: AnsiColor, style?: AnsiStyle) {
  if (color.length === 1) {
    return foreground === ANSI_WHITE && color[0] === background + ANSI_BACKGROUND
  }
  const colorMatched = color[1] === foreground + ANSI_FOREGROUND && color[0] === background + ANSI_BACKGROUND

  return style ? color[2] === style && colorMatched : colorMatched
}
