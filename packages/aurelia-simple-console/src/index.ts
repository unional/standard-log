import isNode from 'is-node'
import semver from 'semver'

/**
 * Simple console appender will send log values to console without the logger id.
 * This means the log will be identical to normal console logs.
 */
export class SimpleConsoleAppender {
  debug(logger: {}, ...rest: any[]) {
    // istanbul ignore next
    if (isConsoleDebugAvailable())
      console.debug(...rest)
    else
      console.log(...rest)
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

// istanbul ignore next
function isConsoleDebugAvailable() {
  if (!isNode) return true
  // without this, systemjs will complain `process is not defined`
  if (!global.process) return true
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  return semver.gt(versionString, '9.3.0')
}
