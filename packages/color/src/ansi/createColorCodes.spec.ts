import { createColorCodes } from './createColorCodes';
import { wrapAnsi } from './wrapAnsi';

test('inspect actual color in console', () => {
  const actual = createColorCodes()
  actual.forEach(color => console.info(wrapAnsi(`${describeColor(color)} ${color.join()}`, color)))
})

function describeColor(color: number[]) {
  const [background, foreground, style] = color
  const names = [toStyleName(style), toColorName(foreground % 10), toColorName(background % 10)].filter(n => !!n)
  return names.join(' ')
}

function toColorName(color: number | undefined) {
  switch (color) {
    case 0: return 'white'
    case 1: return 'red'
    case 2: return 'green'
    case 3: return 'yellow'
    case 4: return 'blue'
    case 5: return 'pink'
    case 6: return 'sky'
    default: return undefined
  }
}

function toStyleName(style: number | undefined) {
  switch (style) {
    case 1: return 'bright'
    case 4: return 'underscore'
    case 7: return 'reversed'
    default: return undefined
  }
}
