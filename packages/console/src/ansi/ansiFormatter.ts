import { LogEntry, toConsoleMethod } from 'standard-log';
import { createTimestampFormatter, TimestampFormat } from '../createTimestampFormatter';
import { adjustCodes } from './adjustCodes';
import { ANSI_FOREGROUND, ANSI_RED, ANSI_YELLOW } from './constants';
import { createColorCodes } from './createColorCodes';
import { wrapAnsi, wrapAnsiId } from './wrapAnsi';

type Context = {
  colorMap: number[][],
  idMap: Record<string, number[]>
  counter: number
}

export type AnsiFormatterOptions = {
  timestamp: TimestampFormat
}

export function createAnsiFormatter(options: AnsiFormatterOptions = { timestamp: 'none' }) {
  const colorMap = getColorMap()
  const context: Context = {
    colorMap,
    idMap: {},
    counter: 0
  }
  const timestampFormatter = createTimestampFormatter(options.timestamp)

  return function ansiFormatter(entry: LogEntry) {
    const consoleMethod = toConsoleMethod(entry.level)
    const codes = adjustCodes(getCodes(context, entry.id), consoleMethod)
    const id = wrapAnsiId(entry.id, codes)
    const rest = [...entry.args]
    const timestamp = timestampFormatter(entry.timestamp)
    if (timestamp !== undefined) rest.push(timestamp)
    const textCodes = consoleMethod === 'error' ? [ANSI_RED + ANSI_FOREGROUND] :
      consoleMethod === 'warn' ? [ANSI_YELLOW + ANSI_FOREGROUND] : undefined

    return textCodes ?
      [id, ...rest.map(x => wrapAnsi(x, textCodes))] :
      [id, ...rest]
  }
}

function getCodes(context: Context, id: string) {
  return context.idMap[id] = context.idMap[id] || context.colorMap[context.counter++ % context.colorMap.length]
}

function getColorMap() {
  return createColorCodes()
}
