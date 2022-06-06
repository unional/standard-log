import { ConsoleLogReporterOptions, createConsoleLogReporter, plainLogFormatter } from 'standard-log'
import { required } from 'unpartial'
import { createAnsiFormatter } from './ansi/index.js'
import { supportColor } from './utils/index.js'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: getFormatter() }, options))
}

function getFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainLogFormatter

  return createAnsiFormatter()
}
