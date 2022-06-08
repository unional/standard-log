import { createConsoleLogReporter } from './console/index.js'
import { createColorLogReporter } from './platform/index.js'

export function getDefaultReporter() {
  try {
    return createColorLogReporter()
  }
  catch (e) {
    // istanbul ignore next
    return createConsoleLogReporter()
  }
}
