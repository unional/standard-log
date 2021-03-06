import { ConsoleLogReporterOptions, createConsoleLogReporter, plainLogFormatter } from 'standard-log'
import { required } from 'unpartial'
import { createAnsiFormatter } from './ansi'
import { supportColor } from './utils'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: getFormatter() }, options))
}

function getFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainLogFormatter

  return createAnsiFormatter()
}
