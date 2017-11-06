import { getLoggers } from './getLoggers'
import { Logger } from './interfaces'

/**
 * Sets log level based on filter.
 * @param logLevel Use logLevel.* to set this value. 0 - none; 1 - error; 2 - warn; 3 - info; 4 - debug
 */
export function setLevels(filter: RegExp, logLevel: number): Logger[] {
  return getLoggers(filter).map(log => {
    log.setLevel(logLevel)
    return log
  })
}
