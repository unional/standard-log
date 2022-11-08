import { createConsoleLogReporter } from 'standard-log'
import { required } from 'unpartial'
import { createAnsiFormatter } from './ansi/index.js'
import type { ColorLogReporterOptions } from './types.js'

export function createColorLogReporter(options?: ColorLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: createAnsiFormatter() }, options))
}
