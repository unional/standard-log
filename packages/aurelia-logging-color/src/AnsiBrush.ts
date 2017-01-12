import { BrushOption, Brush } from './interfaces'

export class AnsiBrush implements Brush {
  private count = 0
  private codes: number[][]
  private map: { [index: string]: number[] } = {}
  private option: BrushOption

  constructor(option: Partial<BrushOption> = {}) {
    this.codes = calculatedCodes = calculatedCodes || createColorCodes()
    this.option = {
      maxColor: option.maxColor || this.codes.length,
      coloringText: option.coloringText || false
    }
  }

  public color(id: string, ...rest: string[]) {
    const codes = this.getCodes(id)
    return [this.wrapAnsi(id, codes), ...rest]
  }

  private getCodes(text: string) {
    return this.map[text] = this.map[text] || this.codes[this.count++ % this.option.maxColor]
  }

  private wrapAnsi(id: string, codes: number[]) {
    const code = codes.join(';')
    if (codes.some(x => x > 40)) {
      // Pad id when there is a background color in use.
      id = ` ${id} `
    }
    return `\u001B[${code}m${id}\u001B[0m`
  }
}

// Bright, dim, underscore
// const styles = [1, 2, 4]
// const foregroundColors = [31, 32, 33, 34, 35, 36]
const backgroundColors = [41, 42, 43, 44, 45, 46]
let calculatedCodes: number[][]

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
