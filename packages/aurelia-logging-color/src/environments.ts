import { release } from 'os'

import { ColorMode } from './interfaces'

const platform = typeof process !== 'undefined' ? process.platform : undefined
const majorVersion = parseInt(release().split('.')[0], 10)

// use `module['e' + 'xports']` to avoid triggering failure in webpack during consumption.
const isNode = typeof module !== 'undefined' && module['e' + 'xports']
const isWindow = platform ? /^win/.test(platform) : false

export function getSupportedColorMode(): ColorMode {
  // Just assume Windows 10 Insider with 16m color support has `majorVersion > 6`.
  // Will fix to the correct version when issue appears.
  return (isNode && (!isWindow || majorVersion <= 6)) ? 'ANSI' : 'ANSI16M'
}
