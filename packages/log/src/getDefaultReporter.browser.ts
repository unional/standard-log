// istanbul ignore next
import { createConsoleLogReporter } from './console';

declare const StandardLogColor: any

export function getDefaultReporter() {
  try {
    return StandardLogColor.createColorLogReporter()
  }
  catch (e) {
    // istanbul ignore next
    return createConsoleLogReporter()
  }
}
