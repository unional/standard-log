/* istanbul ignore file */
import { createConsoleLogReporter } from './console/index.js'

declare const StandardLogColor: any

export function getDefaultReporter() {
  try {
    return StandardLogColor.createColorLogReporter()
  }
  catch (e) {
    return createConsoleLogReporter()
  }
}
