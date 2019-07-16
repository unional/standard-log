import { createConsoleLogReporter, isBrowser, plainLogFormatter, ConsoleLogReporterOptions } from 'standard-log';
import { required } from 'unpartial';
import { createAnsiLogFormatter } from './ansi';
import { createCssLogFormatter } from './css';
import { supportColor } from './utils';

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createConsoleLogReporter(required({ id: 'color', formatter: getLogFormatter() }, options))
}

function getLogFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainLogFormatter

  // istanbul ignore next
  return isBrowser() ? createCssLogFormatter() : createAnsiLogFormatter()
}
