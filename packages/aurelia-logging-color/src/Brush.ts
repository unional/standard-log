import { RGB, createColorsFromMap, ColorMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { supportAnsiColor, supportCSSColor, supportAnsi16mColor } from './environments'

import { BrushOption } from './interfaces'

import { Ansi16mBrush } from './Ansi16mBrush'
import { AnsiBrush } from './AnsiBrush'
import { CSSBrush } from './CSSBrush'

export function createBrush(option: Partial<BrushOption> = {}) {
  if (supportCSSColor) {
    return new CSSBrush(option)
  }

  if (supportAnsi16mColor) {
    return new Ansi16mBrush(option)
  }

  if (supportAnsiColor) {
    return new AnsiBrush(option)
  }

  return new PlainBrush()
}

export class PlainBrush {
  paint(text: string) {
    return text
  }
}
