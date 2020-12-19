import { ConsoleLogReporterOptions, createConsoleLogReporter, plainLogFormatter } from 'standard-log'
import { required } from 'unpartial'
import { createCssFormatter } from './css'
import { supportColor } from './utils'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: getFormatter() }, options))
}

// istanbul ignore next
function getFormatter() {
  if (!supportColor()) return plainLogFormatter

  return createCssFormatter()
}
