import { LogEntry } from 'standard-log-core';
import { getField } from 'type-plus';
import { toConsoleMethod } from '../utils';
import { adjustCodes } from './adjustCodes';
import { colorize, colorizeId } from './colorize';
import { FOREGROUND, RED, YELLOW } from './constants';
import { createColorCodes } from './createColorCodes';

type Context = {
  colorMap: number[][],
  idMap: Record<string, number[]>
  maxColor: number
  counter: number
}

export type AnsiFormatterOptions = {
  maxColor: number
}

export function createAnsiFormatter(options: Partial<AnsiFormatterOptions>) {
  const colorMap = getColorMap()
  const context: Context = {
    colorMap,
    idMap: {},
    maxColor: getField(options, 'maxColor', colorMap.length),
    counter: 0
  }

  return function ansiFormatter(entry: LogEntry) {
    const consoleMethod = toConsoleMethod(entry.level)
    const codes = adjustCodes(getCodes(context, entry.id), consoleMethod)
    const id = colorizeId(entry.id, codes)
    const rest = [...entry.args, entry.timestamp.toISOString()]
    const textCodes = consoleMethod === 'error' ? [RED + FOREGROUND] :
      consoleMethod === 'warn' ? [YELLOW + FOREGROUND] : undefined

    return textCodes ?
      [id, ...rest.map(x => colorize(x, textCodes))] :
      [id, ...rest]
  }
}

function getCodes(context: Context, id: string) {
  return context.idMap[id] = context.idMap[id] || context.colorMap[context.counter++ % context.maxColor]
}

function getColorMap() {
  return createColorCodes()
}
