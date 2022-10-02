
export const logLevels = {
  /**
   * none: 0
   */
  none: 0,
  /**
   * emergency: 100
   */
  emergency: 100,
  /**
   * alert: 200
   */
  alert: 200,
  /**
   * critical: 300
   */
  critical: 300,
  /**
   * error: 400
   */
  error: 400,
  /**
   * warn: 500
   */
  warn: 500,
  /**
   * notice: 600
   */
  notice: 600,
  /**
   * info: 700
   */
  info: 700,
  /**
   * debug: 800
   */
  debug: 800,
  /**
   * trace: 900
   */
  trace: 900,
  /**
   * planck: Infinity
   * `planck unit` is a very small unit <https://en.wikipedia.org/wiki/Planck_units>.
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
export function toLogLevel(name: string) {
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
