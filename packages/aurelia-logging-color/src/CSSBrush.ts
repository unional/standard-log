import { RGB, createColorsFromMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { BrushOption, Brush } from './interfaces'

const gammaMap = {
  rc: 0.2126,
  gc: 0.7152,
  bc: 0.0722,
  lowc: 1 / 12.92
}

export class CSSBrush implements Brush {
  private count = 0
  private colors: RGB[]
  private map: { [index: string]: RGB } = {}
  private option: BrushOption

  constructor(option: Partial<BrushOption> = {}) {
    this.option = {
      maxColor: option.maxColor || 20,
      coloringText: option.coloringText || false
    }
    this.colors = createColorsFromMap(rainbow, option.maxColor || 20)
  }

  color(id: string, ...rest: any[]) {
    // TODO style (italic, bold, underscore) rotation
    const rgb = this.getRgb(id)
    const background = rgbHex(rgb)
    const border = rgbHex(rgb.map(x => Math.max(0, x - 32)) as RGB)
    const color = this.getForegroundColor(rgb)
    let idStr = `%c ${id} `
    if (rest.length > 1 && typeof rest[0] === 'string' && rest[0].indexOf('%c') !== -1) {
      idStr += rest.shift()
    }
    return [idStr, `padding: 2px; margin: 2px; line-height: 1.8em;background: ${background};border: 1px solid ${border};color: ${color};`, ...rest]
  }

  private getRgb(text: string) {
    // It is ok to overlap color.
    // Not trying to be too smart about it.
    return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor]
  }

  private getForegroundColor(background) {
    // Setting the contrasting color as default
    let color = this.getComplementary(background)
    const bgLuminance = this.getRelativeLuminance(background)
    const fgLuminance = (color === '#ffffff') ?
      this.getRelativeLuminance([255, 255, 255]) :
      this.getRelativeLuminance([0, 0, 0])
    const relativeL = bgLuminance > fgLuminance ? (bgLuminance + 0.05) / (fgLuminance + 0.05) : (fgLuminance + 0.05) / (bgLuminance + 0.05)

    // Can set the contrast ratio based on text size later.
    if (relativeL < 4.5) {
      const avgLuminance = background[0] * gammaMap['rc'] + background[1] * gammaMap['gc'] + background[2] * gammaMap['bc']

      // If the relative contrast is lower than standard, we switch color to black/white
      color = (avgLuminance < 220) ? '#ffffff' : '#000000'
    }
    return color
  }

  private getComplementary(rgb: any[]) {
    const r = 255 - rgb[0]
    const g = 255 - rgb[1]
    const b = 255 - rgb[2]
    return rgbHex([r, g, b])
  }

  private getRelativeLuminance(rgb: any[]) {
    // https://www.w3.org/TR/WCAG/#relativeluminancedef
    const rsrgb = rgb[0] / 255
    const gsrgb = rgb[1] / 255
    const bsrgb = rgb[2] / 255

    const r = rsrgb <= 0.03928 ? rsrgb * gammaMap['lowc'] : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
    const g = gsrgb <= 0.03928 ? gsrgb * gammaMap['lowc'] : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
    const b = bsrgb <= 0.03928 ? bsrgb * gammaMap['lowc'] : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

    return r * gammaMap['rc'] + g * gammaMap['gc'] + b * gammaMap['bc']
  }
}
