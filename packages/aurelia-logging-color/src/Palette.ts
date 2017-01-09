import { RGB, createColorsFromMap, ColorMap, rgbHex } from 'color-map'

import { supportAnsiColor, supportBrowserColor } from './environments'

export type ColorMode = 'ANSI' | 'CSS' | 'NONE'
export interface PaletteExtraOption {
  colorMode: ColorMode
}

export interface PaletteOption {
  /**
   * How many colors available.
   * Recommend at least 30.
   */
  maxColor: number

  /**
   * By default, `ColorAppender` will color the background of the logger ID.
   * If this is set to true, then the text of the ID will be colored instead.
   * Currently this only have effect on NodeJS environment.
   */
  coloringText: boolean
}

export const rainbow: ColorMap = [
  { index: 0, rgb: [150, 0, 90] },
  { index: 0.125, rgb: [0, 0, 200] },
  { index: 0.25, rgb: [0, 25, 255] },
  { index: 0.375, rgb: [0, 152, 255] },
  { index: 0.5, rgb: [44, 255, 150] },
  { index: 0.625, rgb: [151, 255, 0] },
  { index: 0.75, rgb: [255, 234, 0] },
  { index: 0.875, rgb: [255, 111, 0] },
  { index: 1, rgb: [255, 0, 0] }
]

// The light green make it hard to read text.
// Dim green a bit to make it more readable.
export const ansiBackground: ColorMap = rainbow.map(m => {
  return {
    index: m.index,
    rgb: [m.rgb[0], m.rgb[1] * 0.7, m.rgb[2]] as RGB
  }
})

export class Palette {
  public color: (text: string) => string

  /**
   * How many unique strings encountered.
   */
  private count = 0
  private option: PaletteOption
  private colors: RGB[]
  private map: { [index: string]: RGB } = {}
  constructor(option: Partial<PaletteOption> & Partial<PaletteExtraOption> = {}) {
    this.option = {
      maxColor: option.maxColor || 20,
      coloringText: option.coloringText || false
    }

    const colorMode = option.colorMode || (supportAnsiColor ? 'ANSI' : supportBrowserColor ? 'CSS' : 'NONE')
    if (colorMode === 'ANSI') {
      if (option.coloringText) {
        this.colors = createColorsFromMap(rainbow, this.option.maxColor)
        this.color = this.getAnsi16mString
      }
      else {
        this.colors = createColorsFromMap(ansiBackground, this.option.maxColor)
        this.color = this.getAnsi16mBackgroundString
      }
    }
    else if (colorMode === 'CSS') {
      this.colors = createColorsFromMap(rainbow, this.option.maxColor)
      this.color = this.getCSSMetaString
    }
    else {
      this.colors = createColorsFromMap(rainbow, this.option.maxColor)
      this.color = (x) => x
    }
  }
  private getRgb(text: string) {
    // It is ok to overlep color.
    // Not trying to be too smart about it.
    return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor]
  }
  private getAnsi16mString(text: string) {
    const rgb = this.getRgb(text)
    return this.wrapAnsi16m(text, rgb)
  }

  private getAnsi16mBackgroundString(text: string) {
    const rgb = this.getRgb(text)
    return this.wrapAnsi16m(text, rgb, 10)
  }
  private wrapAnsi16m(text: string, rgb, offset: number = 0) {
    return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m` + text + `\u001B[${39 + offset}m`
  }
  private getCSSMetaString(text: string) {
    const rgb = this.getRgb(text)
    const background = rgbHex(rgb)
    const border = rgbHex(rgb.map(x => Math.max(0, x - 32)))
    const color = rgb.every(x => x < 220) ? '#ffffff' : '#000000'

    return `padding: 2px; margin: 2px; line-height: 1.8em;background: ${background};bother: 1px solid ${border};color: ${color};`
  }
}
