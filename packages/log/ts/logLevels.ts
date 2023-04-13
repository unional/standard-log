export const logLevels = {
	/**
	 * none: 0
	 */
	none: 0 as const,
	/**
	 * emergency: 100
	 *
	 * emergency -> alert
	 */
	emergency: 100 as const,
	/**
	 * alert: 200
	 *
	 * emergency -> alert -> critical
	 */
	alert: 200 as const,
	/**
	 * critical: 300
	 *
	 * alert -> critical -> error
	 */
	critical: 300 as const,
	/**
	 * error: 400
	 *
	 * critical -> error -> warn
	 */
	error: 400 as const,
	/**
	 * warn: 500
	 *
	 * error -> warn -> notice
	 */
	warn: 500 as const,
	/**
	 * notice: 600
	 *
	 * warn -> notice -> info
	 */
	notice: 600 as const,
	/**
	 * info: 700
	 *
	 * notice -> info -> debug
	 */
	info: 700 as const,
	/**
	 * debug: 800
	 *
	 * info -> debug -> trace
	 */
	debug: 800 as const,
	/**
	 * trace: 900
	 *
	 * debug -> trace -> planck
	 */
	trace: 900 as const,
	/**
	 * planck: Infinity
	 * `planck unit` is a very small unit <https://en.wikipedia.org/wiki/Planck_units>.
	 *
	 * trace -> planck
	 */
	planck: Infinity,
	/**
	 * all: Infinity
	 */
	all: Infinity
}

/**
 * Convert default log level value to log level name.
 */
export function toLogLevelName(level: number) {
	if (level <= 100) return 'emergency'
	if (level <= 200) return 'alert'
	if (level <= 300) return 'critical'
	if (level <= 400) return 'error'
	if (level <= 500) return 'warn'
	if (level <= 600) return 'notice'
	if (level <= 700) return 'info'
	if (level <= 800) return 'debug'
	if (level <= 900) return 'trace'
	return 'planck'
}

/**
 * Convert default log level name to log level value.
 */
export function toLogLevel(name: string): number | undefined {
	return (logLevels as any)[name.toLocaleLowerCase()]
}

export const DEFAULT_LOG_METHOD_NAMES: string[] = [
	'emergency',
	'alert',
	'critical',
	'error',
	'warn',
	'notice',
	'info',
	'debug',
	'trace',
	'planck'
]
