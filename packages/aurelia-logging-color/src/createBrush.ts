import { RGB, createColorsFromMap, ColorMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { supportAnsiColor, supportCSSColor, supportAnsi16mColor } from './environments'

import { Brush, BrushOption } from './interfaces'

import { Ansi16mBrush } from './Ansi16mBrush'
import { AnsiBrush } from './AnsiBrush'
import { CSSBrush } from './CSSBrush'

export interface InternalBrushOption {
  css: boolean
  ansi16m: boolean
  ansi: boolean
}

export function createBrush(option: Partial<BrushOption> & Partial<InternalBrushOption> = {}) {
  const css = option.css !== undefined ? option.css : supportCSSColor
  const ansi16m = option.ansi16m !== undefined ? option.ansi16m : supportAnsi16mColor
  const ansi = option.ansi !== undefined ? option.ansi : supportAnsiColor
  if (css) {
    return new CSSBrush(option)
  }

  if (ansi16m) {
    return new Ansi16mBrush(option)
  }

  if (ansi) {
    return new AnsiBrush(option)
  }

  return new PlainBrush()
}

export class PlainBrush implements Brush {
  color(id: string, ...rest: string[]) {
    return [id, ...rest]
  }
}
