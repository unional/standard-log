import { RGB, createColorsFromMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { BrushOption, Brush } from './interfaces'

export class AnsiBrush implements Brush {
  public paint: (text: string) => string
  private count = 0
  private codes: number[][]
  private map: { [index: string]: number[] } = {}
  private option: BrushOption

  constructor(option: Partial<BrushOption> = {}) {
    this.codes = createColorCodes()
    this.option = {
      maxColor: option.maxColor || this.codes.length,
      coloringText: option.coloringText || false
    }

    this.paint = this.option.coloringText ? this.getString : this.getBackgroundString
  }

  private getCodes(text: string) {
    return this.map[text] = this.map[text] || this.codes[this.count++ % this.option.maxColor]
  }
  private getString(text: string) {
    const codes = this.getCodes(text)
    return this.wrapAnsi(text, codes)
  }

  private getBackgroundString(text: string) {
    const codes = this.getCodes(text)
    return this.wrapAnsi(text, codes)
  }
  private wrapAnsi(text: string, codes: number[]) {
    const code = codes.join(';')
    return `\u001B[${code}m${text}\u001B[0m`
  }
}

// Bright, dim, underscore
// const styles = [1, 2, 4]
// const foregroundColors = [31, 32, 33, 34, 35, 36]
const backgroundColors = [41, 42, 43, 44, 45, 46]

function createColorCodes() {
  let baseCodes: number[][] = backgroundColors.map(x => [x])

  baseCodes.push(...backgroundColors.map(x => [x, 31]))
  baseCodes.push(...backgroundColors.map(x => [x, 32]))
  baseCodes.push(...backgroundColors.map(x => [x, 33]))
  baseCodes.push(...backgroundColors.map(x => [x, 34]))
  baseCodes.push(...backgroundColors.map(x => [x, 35]))
  baseCodes.push(...backgroundColors.map(x => [x, 36]))

  baseCodes = baseCodes.filter(x => x.length === 1 || x[0] !== x[1] + 10)

  const brighten = baseCodes.map(x => [...x, 1])
  const dimmed = baseCodes.map(x => [...x, 2])
  const underscored = baseCodes.map(x => [...x, 4])
  return [...baseCodes, ...brighten, ...dimmed, ...underscored]
}
