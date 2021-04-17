import isNode from 'is-node'
import { semverGt } from './semverGt'

// istanbul ignore file
export function isConsoleDebugAvailable() {
  if (!isNode) return true
  // without this, systemJs will complain `process is not defined`
  if (!global.process) return true
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  return semverGt(versionString, [9, 3, 0])
}
