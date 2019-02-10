import { Ansi16mBrush } from './Ansi16mBrush';
import { AnsiBrush } from './AnsiBrush';
import { CSSBrush } from './CSSBrush';
import { getSupportedColorMode } from './environments';
import { Brush, BrushOption, ColorMode, ColorModeOption } from './interfaces';

export class PlainBrush implements Brush {
  color(id: string, ...rest: string[]) {
    return [id, ...rest]
  }
}

export function createBrush(option: Partial<BrushOption> & Partial<ColorModeOption> = {}) {
  const colorMode: ColorMode = option.colorMode || getSupportedColorMode()

  let brush;
  switch (colorMode) {
    case 'CSS':
      brush = new CSSBrush(option)
      break
    case 'ANSI':
      brush = new AnsiBrush(option)
      break
    case 'ANSI16M':
      brush = new Ansi16mBrush(option)
      break
    default:
    case 'NONE':
      brush = new PlainBrush()
      break
  }
  return brush
}
