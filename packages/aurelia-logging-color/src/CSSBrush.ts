import { RGB, createColorsFromMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { BrushOption, Brush } from './interfaces'

export class CSSBrush implements Brush {
  private count = 0
  private colors: RGB[]
  private map: { [index: string]: RGB } = {}
  private option: BrushOption
  private gammaMap = {
    rc: 0.2126,
    gc: 0.7152,
    bc: 0.0722,
    lowc: 1 / 12.92
  }

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
    const border = rgbHex(rgb.map(x => Math.max(0, x - 32)))
    const avgLuminance = rgb[0] * this.gammaMap['rc'] + rgb[1] * this.gammaMap['gc'] + rgb[2] * this.gammaMap['bc']
    let color = this.getComplementary(rgb) // Setting the contrasting color as default
    const bgLuminance = this.relativeLuminance(rgb)
    const fgLuminance = (color === '#ffffff') ? this.relativeLuminance([255, 255, 255]) : this.relativeLuminance([0, 0, 0])
    const relativeL = bgLuminance > fgLuminance ? (bgLuminance + 0.05) / (fgLuminance + 0.05) : (fgLuminance + 0.05) / (bgLuminance + 0.05)
    if (relativeL < 4.5) { // Can set the contrast ratio based on text size later.
      color = (avgLuminance < 220) ? '#ffffff' : '#000000' // If the relative contrast is lower than standard, we switch color to black/white
    }
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

  private relativeLuminance(rgb: any[]) {
    const rsrgb = rgb[0] / 255 // https://www.w3.org/TR/WCAG/#relativeluminancedef
    const gsrgb = rgb[1] / 255
    const bsrgb = rgb[2] / 255

    const r = rsrgb <= 0.03928 ? rsrgb * this.gammaMap['lowc'] : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
    const g = gsrgb <= 0.03928 ? gsrgb * this.gammaMap['lowc'] : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
    const b = bsrgb <= 0.03928 ? bsrgb * this.gammaMap['lowc'] : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

    return r * this.gammaMap['rc'] + g * this.gammaMap['gc'] + b * this.gammaMap['bc']
  }

  private getComplementary(rgb: any[]) {
    const r = 255 - rgb[0]
    const g = 255 - rgb[1]
    const b = 255 - rgb[2]
    return rgbHex([r, g, b])
  }
}
