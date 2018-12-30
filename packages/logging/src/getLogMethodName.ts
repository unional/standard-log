import { logLevel } from 'aurelia-logging';

export function getLogMethodName(level: number) {
  if (level >= logLevel.debug) return 'debug'
  if (level >= logLevel.info) return 'info'
  if (level >= logLevel.warn) return 'warn'
  if (level >= logLevel.error) return 'error'
  return undefined
}
