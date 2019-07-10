import { BACKGROUND, Color, FOREGROUND, WHITE } from './constants';

export function isColor(color: number[], foreground: Color, background: Color, style?: 1 | 2 | 4) {
  if (color.length === 1) {
    return foreground === WHITE && color[0] === background + BACKGROUND
  }
  const colorMatched = color[1] === foreground + FOREGROUND && color[0] === background + BACKGROUND

  return style ? color[2] === style && colorMatched : colorMatched
}
