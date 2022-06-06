import { ANSI_BACKGROUND, ANSI_BLUE, ANSI_BRIGHT, ANSI_CYAN, ANSI_FOREGROUND, ANSI_GREEN, ANSI_MAGENTA, ANSI_RED, ANSI_UNDERSCORE, ANSI_WHITE, ANSI_YELLOW } from './constants.js'
import { isColor } from './isColor.js'

export function createColorCodes() {
  const baseColors = [ANSI_RED, ANSI_GREEN, ANSI_YELLOW, ANSI_BLUE, ANSI_MAGENTA, ANSI_CYAN]
  const backgroundColors = baseColors.map(c => c + ANSI_BACKGROUND)

  let baseCodes: number[][] = backgroundColors.map(x => [x])

  baseColors.forEach(base => baseCodes.push(...backgroundColors.map(x => [x, base + ANSI_FOREGROUND])))

  baseCodes = filterForegroundBackgroundAreSame(baseCodes)
  baseCodes = filterHandPickedColors(baseCodes)

  const brighten = baseCodes.filter(c => c.length !== 1).map(x => [...x, ANSI_BRIGHT])
  const underscored = baseCodes.filter(c => c.length !== 1).map(x => [...x, ANSI_UNDERSCORE])
  return [...baseCodes, ...brighten, ...underscored]
}

function filterForegroundBackgroundAreSame(baseCodes: number[][]) {
  return baseCodes.filter(x => x.length === 1 || x[0] !== x[1] + 10)
}

function filterHandPickedColors(baseCodes: number[][]) {
  return baseCodes.filter(x =>
    !isColor(x, ANSI_WHITE, ANSI_YELLOW) &&
    !isColor(x, ANSI_MAGENTA, ANSI_RED) &&
    !isColor(x, ANSI_RED, ANSI_MAGENTA) &&
    !isColor(x, ANSI_CYAN, ANSI_BLUE) &&
    !isColor(x, ANSI_BLUE, ANSI_CYAN) &&
    !isColor(x, ANSI_CYAN, ANSI_GREEN) &&
    !isColor(x, ANSI_GREEN, ANSI_CYAN) &&
    !isColor(x, ANSI_RED, ANSI_BLUE) &&
    !isColor(x, ANSI_BLUE, ANSI_RED) &&
    !isColor(x, ANSI_BLUE, ANSI_MAGENTA) &&
    !isColor(x, ANSI_MAGENTA, ANSI_BLUE) &&
    !isColor(x, ANSI_GREEN, ANSI_YELLOW) &&
    !isColor(x, ANSI_YELLOW, ANSI_GREEN) &&
    !isColor(x, ANSI_CYAN, ANSI_YELLOW) &&
    !isColor(x, ANSI_YELLOW, ANSI_CYAN)
  )
}
