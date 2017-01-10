import { RGB, createColorsFromMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { BrushOption, Brush } from './interfaces'

export class Ansi16mBrush implements Brush {
  public paint: (text: string) => string
  private count = 0
  private colors: RGB[]
  private map: { [index: string]: RGB } = {}
  private option: BrushOption

  constructor(option: Partial<BrushOption> = {}) {
    this.option = {
      maxColor: option.maxColor || 20,
      coloringText: option.coloringText || false
    }

    // For background color, the light green make it hard to read text.
    // Dim green a bit to make it more readable.
    const colormap = this.option.coloringText ? rainbow : rainbow.map(m => {
      return {
        index: m.index,
        rgb: [m.rgb[0], m.rgb[1] * 0.7, m.rgb[2]] as RGB
      }
    })

    this.colors = createColorsFromMap(colormap, option.maxColor || 20)

    this.paint = this.option.coloringText ? this.getAnsi16mString : this.getAnsi16mBackgroundString
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
}
