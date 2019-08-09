import { ConsoleLogReporterOptions, createConsoleLogReporter, plainLogFormatter } from 'standard-log';
import { required } from 'unpartial';
import { createAnsiFormatter } from './ansi';
import { createCssFormatter } from './css';
import { isBrowser, supportColor } from './utils';

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ formatter: getFormatter() }, options))
}

function getFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainLogFormatter

  // istanbul ignore next
  return isBrowser() ? createCssFormatter() : createAnsiFormatter()
}
