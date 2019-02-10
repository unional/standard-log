/**
 * Convert log level to syslog severity
 * @see <https://en.wikipedia.org/wiki/Syslog>
 * @param level log level
 */
export function toSyslogSeverity(level: number) {
  switch (true) {
    case (level < 20):
      return 'emergency'
    case (level < 30):
      return 'alert'
    case (level < 40):
      return 'critical'
    case (level < 50):
      return 'error'
    case (level < 60):
      return 'warning'
    case (level < 70):
      return 'notice'
    case (level < 80):
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
    case (level < 20):
      return 'emerg'
    case (level < 30):
      return 'alert'
    case (level < 40):
      return 'crit'
    case (level < 50):
      return 'err'
    case (level < 60):
      return 'warning'
    case (level < 70):
      return 'notice'
    case (level < 80):
      return 'info'
    default:
      return 'debug'
  }
}
