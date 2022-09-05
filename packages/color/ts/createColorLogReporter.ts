import { ConsoleLogReporterOptions, createConsoleLogReporter } from 'standard-log'
import { required } from 'unpartial'
import { createAnsiFormatter } from './ansi/index.js'

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: createAnsiFormatter() }, options))
}
