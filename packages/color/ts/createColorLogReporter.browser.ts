import { ConsoleLogReporterOptions, createConsoleLogReporter, plainLogFormatter } from 'standard-log'
import { required } from 'unpartial'
import { createCssFormatter } from './css/index.js'
import { supportColor } from './utils/index.js'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: getFormatter() }, options))
}

// istanbul ignore next
function getFormatter() {
  if (!supportColor()) return plainLogFormatter

  return createCssFormatter()
}
