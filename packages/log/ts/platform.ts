import { inspect } from 'util'
import type { LogEntry } from './types.js'

export function semverGt(versionString: string, version: [number, number, number]) {
  const actual = versionString.split('.').reverse().reduce((p, v, i) => {
    p += Number.parseInt(v, 10) * Math.pow(100, i)
    return p
  }, 0)

  return actual > (version[0] * 10000 + version[1] * 100 + version[2])
}

export function isConsoleDebugAvailable() {
  // without this, systemJs will complain `process is not defined`
  if (!global.process) return true
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  return semverGt(versionString, [9, 3, 0])
}

export const toInspectLogEntry = (e: LogEntry) => (
  e.args = e.args.map(value => typeof value === 'object' && value !== null ? inspect(value) : value),
  e)
