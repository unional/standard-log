/**
 * Convert log level to syslog severity
 * @see <https://en.wikipedia.org/wiki/Syslog>
 * @param level log level
 */
export function toSyslogSeverity(level: number) {
	switch (true) {
		case level < 200:
			return 'emergency'
		case level < 300:
			return 'alert'
		case level < 400:
			return 'critical'
		case level < 500:
			return 'error'
		case level < 600:
			return 'warning'
		case level < 700:
			return 'notice'
		case level < 800:
			return 'informational'
		default:
			return 'debug'
	}
}

/**
 * Convert log level to syslog keywords
 * @see <hhttps://en.wikipedia.org/wiki/Syslog>
 * @param level log level
 */
export function toSyslogKeyword(level: number) {
	switch (true) {
		case level < 200:
			return 'emerg'
		case level < 300:
			return 'alert'
		case level < 400:
			return 'crit'
		case level < 500:
			return 'err'
		case level < 600:
			return 'warning'
		case level < 700:
			return 'notice'
		case level < 800:
			return 'info'
		default:
			return 'debug'
	}
}

/**
 * Convert log level to syslog level.
 */
export function toSyslogLevel(level: number) {
	return Math.floor((Math.min(800, level) - 1) / 100)
}
