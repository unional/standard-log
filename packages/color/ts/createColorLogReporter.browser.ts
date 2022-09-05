import { consoleFormatter, ConsoleLogReporterOptions, createConsoleLogReporter } from 'standard-log'
import { unpartial } from 'unpartial'
import { createCssFormatter } from './css/index.js'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(unpartial({
    formatter: supportCSSColorInConsole() ? createCssFormatter() : consoleFormatter
  }, options))
}

// istanbul ignore next
function supportCSSColorInConsole() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  // @ts-ignore
  if (window?.process?.type === 'renderer' || window?.process?.__nwjs) {
    return true
  }

  // Internet Explorer and Edge do not support colors.
  if (navigator?.userAgent?.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false
  }

  // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  // @ts-ignore
  return (document?.documentElement?.style?.WebkitAppearance) ||
    // Is firebug? http://stackoverflow.com/a/398120/376773
    // @ts-ignore
    (window?.console?.firebug || (window?.console?.exception && window?.console?.table)) ||
    // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator?.userAgent?.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // Double check webkit in userAgent just in case we are in a worker
    (navigator?.userAgent?.toLowerCase().match(/applewebkit\/(\d+)/))
}
