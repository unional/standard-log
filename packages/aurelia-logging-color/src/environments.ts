import { ColorMode } from './interfaces'

// tslint:disable-next-line strict-type-predicates
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

// tslint:disable-next-line strict-type-predicates
const vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined

// alternatively check `!!window.chrome`
const isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false
const isFirefox = userAgent ? /firefox/i.test(userAgent) : false

// use `module['e' + 'xports']` to avoid triggering failure in webpack during consumption.
// webpack provides a fake `module`. Need to exclude it by checking `webpackPolyfill`
// tslint:disable-next-line strict-type-predicates
const isNode = typeof module !== 'undefined' && module['e' + 'xports'] && !module['webpackPolyfill']

export function getSupportedColorMode(): ColorMode {
  // Only support 'ANSI' to avoid checking Windows version.
  // This eliminate the need of 'os' module thus not getting into
  // browser-field-spec problem with webpack.
  return isNode ? 'ANSI' :
    // Not checking specific version support, but should work as
    // most people update their chrome and firefox.
    isChrome || isFirefox ? 'CSS' : 'NONE'

}
