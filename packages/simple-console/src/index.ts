/**
 * Simple console appender will send log values to console without the logger id.
 * This means the log will be identical to normal console logs.
 */
export class SimpleConsoleAppender {
  debug(logger: {}, ...rest: any[]) {
    console.debug(...rest)
  }
  info(logger: {}, ...rest: any[]) {
    console.info(...rest)
  }
  warn(logger: {}, ...rest: any[]) {
    console.warn(...rest)
  }
  error(logger: {}, ...rest: any[]) {
    console.error(...rest)
  }
}
