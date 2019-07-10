import { BACKGROUND, BLUE, BRIGHT, CYAN, FOREGROUND, GREEN, MAGENTA, RED, UNDERSCORE, WHITE, YELLOW } from './constants';
import { isColor } from './isColor';


export function createColorCodes() {
  const baseColors = [RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN]
  const backgroundColors = baseColors.map(c => c + BACKGROUND)

  let baseCodes: number[][] = backgroundColors.map(x => [x])

  baseColors.forEach(base => baseCodes.push(...backgroundColors.map(x => [x, base + FOREGROUND])))

  baseCodes = filterForegroundBackgroundAreSame(baseCodes)
  baseCodes = filterHandPickedColors(baseCodes)

  const brighten = baseCodes.filter(c => c.length !== 1).map(x => [...x, BRIGHT])
  const underscored = baseCodes.filter(c => c.length !== 1).map(x => [...x, UNDERSCORE])
  return [...baseCodes, ...brighten, ...underscored]
}

function filterForegroundBackgroundAreSame(baseCodes: number[][]) {
  return baseCodes.filter(x => x.length === 1 || x[0] !== x[1] + 10)
}

function filterHandPickedColors(baseCodes: number[][]) {
  return baseCodes.filter(x =>
    !isColor(x, WHITE, YELLOW) &&
    !isColor(x, MAGENTA, RED) &&
    !isColor(x, RED, MAGENTA) &&
    !isColor(x, CYAN, BLUE) &&
    !isColor(x, BLUE, CYAN) &&
    !isColor(x, CYAN, GREEN) &&
    !isColor(x, GREEN, CYAN) &&
    !isColor(x, RED, BLUE) &&
    !isColor(x, BLUE, RED) &&
    !isColor(x, BLUE, MAGENTA) &&
    !isColor(x, MAGENTA, BLUE) &&
    !isColor(x, GREEN, YELLOW) &&
    !isColor(x, YELLOW, GREEN) &&
    !isColor(x, CYAN, YELLOW) &&
    !isColor(x, YELLOW, CYAN)
  )
}
