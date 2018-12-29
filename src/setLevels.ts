import { getLoggers } from './getLoggers'
import { Logger } from './interfaces'

/**
 * Sets log level based on filter.
 * @param logLevel Use logLevel.* to set this value. 0 - none; 10 - error; 20 - warn; 30 - info; 40 - debug
 */
export function setLevels(filter: RegExp, logLevel: number): Logger[] {
  return getLoggers(filter).map(log => {
    log.level = logLevel
    return log
  })
}
