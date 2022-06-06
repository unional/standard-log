import { upperCase } from 'upper-case'
import { toLogLevelName } from '../logLevelFn.js'

export function formatLogLevel(level: number) {
  return `(${upperCase(toLogLevelName(level))})`
}
