import { createTimestampFormatter, LogEntry, TimestampFormat } from 'standard-log'
import { createColorsFromMap, RGB, RGBA, rgbHex } from 'color-map'
import { required } from 'unpartial'
import { rainbow } from './colors.js'

export type CssFormatterOptions = {
  /**
   * How many colors available.
   * Recommend at least 10.
   * Default to 20.
   */
  maxColor: number,
  timestamp: TimestampFormat
}

export function createCssFormatter(options?: Partial<CssFormatterOptions>) {
  const { maxColor, timestamp } = required({ maxColor: 20, timestamp: 'none' }, options)
  const loggerMap: Record<string, RGB> = Object.create(null)
  const colorMap: RGBA[] = createColorsFromMap(rainbow, maxColor)
  let count = 0

  const timestampFormatter = createTimestampFormatter(timestamp)

  return function cssFormatter(entry: LogEntry) {
    let idStr = `%c ${entry.id} `
    let args: any[]
    if (firstArgIsColorTemplate(entry.args)) {
      idStr += entry.args[0]
      args = [...entry.args.slice(1)]
    }
    else {
      args = [...entry.args]
    }
    const rgb = getRgb(entry.id)
    const background = rgbHex(rgb)
    const border = rgbHex(rgb.map(x => Math.max(0, x - 32)) as RGB)
    const color = getForegroundColor(rgb)
    const result = [
      idStr,
      `padding: 2px; margin: 2px; line-height: 1.8em;background: ${background};border: 1px solid ${border};color: ${color};`,
      ...args
    ]
    const t = timestampFormatter(entry.timestamp)
    if (t !== undefined) result.push(t)
    return result
  }

  function firstArgIsColorTemplate(args: any[]) {
    return typeof args[0] === 'string' && args[0].indexOf('%c') !== -1
  }

  function getRgb(id: string) {
    return loggerMap[id] = loggerMap[id] || colorMap[count++ & maxColor]
  }
}

const gammaMap = {
  rc: 0.2126,
  gc: 0.7152,
  bc: 0.0722,
  lowc: 1 / 12.92
}

function getForegroundColor(background: RGB) {
  // Setting the contrasting color as default
  let color = getComplementary(background)
  const bgLuminance = getRelativeLuminance(background)
  const fgLuminance = (color === '#ffffff') ?
    getRelativeLuminance([255, 255, 255]) :
    getRelativeLuminance([0, 0, 0])
  const relativeL = bgLuminance > fgLuminance ? (bgLuminance + 0.05) / (fgLuminance + 0.05) : (fgLuminance + 0.05) / (bgLuminance + 0.05)

  // Can set the contrast ratio based on text size later.
  if (relativeL < 4.5) {
    const avgLuminance = background[0] * gammaMap['rc'] + background[1] * gammaMap['gc'] + background[2] * gammaMap['bc']

    // If the relative contrast is lower than standard, we switch color to black/white
    color = (avgLuminance < 220) ? '#ffffff' : '#000000'
  }
  return color
}

function getRelativeLuminance(rgb: RGB) {
  // https://www.w3.org/TR/WCAG/#relativeluminancedef
  const rsrgb = rgb[0] / 255
  const gsrgb = rgb[1] / 255
  const bsrgb = rgb[2] / 255

  const r = rsrgb <= 0.03928 ? rsrgb * gammaMap['lowc'] : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
  const g = gsrgb <= 0.03928 ? gsrgb * gammaMap['lowc'] : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
  const b = bsrgb <= 0.03928 ? bsrgb * gammaMap['lowc'] : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

  return r * gammaMap['rc'] + g * gammaMap['gc'] + b * gammaMap['bc']
}

function getComplementary(rgb: RGB) {
  const r = 255 - rgb[0]
  const g = 255 - rgb[1]
  const b = 255 - rgb[2]
  return rgbHex([r, g, b])
}
