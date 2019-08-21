/* istanbul ignore file */
import { createConsoleLogReporter } from './console';

declare const StandardLogColor: any

export function getDefaultReporter() {
  try {
    return StandardLogColor.createColorLogReporter()
  }
  catch {
    return createConsoleLogReporter()
  }
}
