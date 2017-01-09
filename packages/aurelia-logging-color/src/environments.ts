const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
const vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined

// alternatively check `!!window.chrome`
const isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false
const isFirefox = userAgent ? /firefox/i.test(userAgent) : false

const isNode = typeof module !== 'undefined' && module.exports

// Not checking specific version support, but should work as
// most people update their chrome and firefox.
export const supportBrowserColor = isChrome || isFirefox
export const supportAnsiColor = isNode
