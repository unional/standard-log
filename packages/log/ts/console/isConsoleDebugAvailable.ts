import { semverGt } from './semverGt.js'

// istanbul ignore file
export function isConsoleDebugAvailable() {
  // without this, systemJs will complain `process is not defined`
  if (!global.process) return true
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  return semverGt(versionString, [9, 3, 0])
}
