import { createConsoleLogReporter } from './console';

export function getDefaultReporter() {
  try {
    // tricks webpack to not bundle standard-log-color
    const c = '-color'
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const colorModule = require('standard-log' + c)
    return colorModule.createColorLogReporter()
  }
  catch (e) {
    // istanbul ignore next
    return createConsoleLogReporter()
  }
}
