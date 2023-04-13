import { createTimestampFormatter, LogEntry, TimestampFormat, toConsoleMethod } from 'standard-log'
import { ColorLevels, supportColor } from '../supportColor.js'
import {
	ANSI_BACKGROUND,
	ANSI_BLACK,
	ANSI_BLUE,
	ANSI_BRIGHT,
	ANSI_CYAN,
	ANSI_FOREGROUND,
	ANSI_GREEN,
	ANSI_MAGENTA,
	ANSI_RED,
	ANSI_UNDERSCORE,
	ANSI_WHITE,
	ANSI_YELLOW
} from './constants.js'
import { wrapAnsi } from './wrapAnsi.js'

export type AnsiFormatterOptions = {
	timestamp: TimestampFormat
}

export function createAnsiFormatter(options: AnsiFormatterOptions = { timestamp: 'none' }) {
	const timestampFormatter = createTimestampFormatter(options.timestamp)

	return function ansiFormatter(entry: LogEntry) {
		const consoleMethod = toConsoleMethod(entry.level)
		const id = formatID(consoleMethod, entry.id)
		const args = formatArgs(timestampFormatter, consoleMethod, entry)
		return [id, ...args]
	}
}

function formatArgs(
	timestampFormatter: (timestamp: Date) => string | undefined,
	method: 'error' | 'warn' | 'info' | 'debug',
	entry: Pick<LogEntry, 'args' | 'timestamp'>
) {
	const args = [...entry.args]
	const timestamp = timestampFormatter(entry.timestamp)
	if (timestamp !== undefined) args.push(timestamp)
	const textCodes =
		method === 'error'
			? [ANSI_RED + ANSI_FOREGROUND]
			: method === 'warn'
			? [ANSI_YELLOW + ANSI_FOREGROUND]
			: undefined

	return textCodes ? args.map(x => wrapAnsi(x, textCodes)) : args
}

function formatID(method: 'error' | 'warn' | 'info' | 'debug', id: string) {
	const colorLevels = supportColor()
	const colorLevel = method === 'error' ? colorLevels.stderr : colorLevels.stdout
	return toIDFormatter(colorLevel)(id)
}

function toIDFormatter(colorLevel: ColorLevels) {
	// istanbul ignore next
	switch (colorLevel) {
		case ColorLevels.DISABLED:
			return (id: string) => id
		case ColorLevels.BASIC:
			return basicIDFormatter
		case ColorLevels.ANSI:
			return ansiIDFormatter
		case ColorLevels.TRUE:
			return truecolorIDFormatter
	}
}

function basicIDFormatter(id: string) {
	const codes = getAnsiColor(id)
	return wrapAnsi(` ${id} `, codes)
}

const ansiColors: {
	counter: number
	list: Array<number[]>
} = {
	counter: 0,
	list: [
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_RED + ANSI_BACKGROUND],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_GREEN + ANSI_BACKGROUND],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_YELLOW + ANSI_BACKGROUND],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLUE + ANSI_BACKGROUND],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_MAGENTA + ANSI_BACKGROUND],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_CYAN + ANSI_BACKGROUND],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLACK + ANSI_BACKGROUND],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_RED + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_GREEN + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_YELLOW + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLUE + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_MAGENTA + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_CYAN + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLACK + ANSI_BACKGROUND, ANSI_BRIGHT],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_RED + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_GREEN + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_YELLOW + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLUE + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_MAGENTA + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_CYAN + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLACK + ANSI_BACKGROUND, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_RED + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_GREEN + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_YELLOW + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLUE + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_MAGENTA + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_BLACK + ANSI_FOREGROUND, ANSI_CYAN + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE],
		[ANSI_WHITE + ANSI_FOREGROUND, ANSI_BLACK + ANSI_BACKGROUND, ANSI_BRIGHT, ANSI_UNDERSCORE]
	]
}
const ansiColorMap: Record<string, number[]> = Object.create(null)

function getAnsiColor(id: string) {
	return (ansiColorMap[id] =
		ansiColorMap[id] || ansiColors.list[ansiColors.counter++ % ansiColors.list.length])
}

// istanbul ignore next
function ansiIDFormatter(id: string) {
	return basicIDFormatter(id)
}

// istanbul ignore next
function truecolorIDFormatter(id: string) {
	return basicIDFormatter(id)
}
