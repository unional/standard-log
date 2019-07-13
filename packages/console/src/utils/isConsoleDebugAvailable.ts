import isNode from 'is-node';
import semver from 'semver';

// istanbul ignore file
export function isConsoleDebugAvailable() {
  if (!isNode) return true
  // without this, systemjs will complain `process is not defined`
  if (!global.process) return true
  const versionString = process.version.startsWith('v') ? process.version.slice(1) : process.version
  return semver.gt(versionString, '9.3.0')
}
