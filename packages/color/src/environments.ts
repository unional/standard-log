import isNode from 'is-node'
import { ColorMode } from './interfaces'

export { isNode }

// @ts-ignore
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

// @ts-ignore
const vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined

// alternatively check `!!window.chrome`
const isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false
const isFirefox = userAgent ? /firefox/i.test(userAgent) : false

export function getSupportedColorMode(): ColorMode {
  // Only support 'ANSI' to avoid checking Windows version.
  // This eliminate the need of 'os' module thus not getting into
  // browser-field-spec problem with webpack.
  return isNode ? 'ANSI' :
    // Not checking specific version support, but should work as
    // most people update their chrome and firefox.
    isChrome || isFirefox ? 'CSS' : 'NONE'

}
