import { release } from 'os'

const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
const vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined

const platform = typeof process !== 'undefined' ? process.platform : undefined
const majorVersion = parseInt(release().split('.')[0], 10)

// alternatively check `!!window.chrome`
const isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false
const isFirefox = userAgent ? /firefox/i.test(userAgent) : false

// use `module['e' + 'xports']` to avoid triggering failure in webpack during consumption.
const isNode = typeof module !== 'undefined' && module['e' + 'xports']
const isWindow = platform ? /^win/.test(platform) : false

// Not checking specific version support, but should work as
// most people update their chrome and firefox.
export const supportCSSColor = isChrome || isFirefox
export const supportAnsiColor = isNode && (!isWindow || majorVersion <= 6)

// Just assume Windows 10 Insider with 16m support is v7.
export const supportAnsi16mColor = isNode && (!isWindow || majorVersion > 6)
