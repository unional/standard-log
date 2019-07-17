import { ConsoleLogReporterOptions, createConsoleLogReporter as createBaseReporter, isBrowser, plainLogFormatter } from 'standard-log';
import { required } from 'unpartial';
import { createAnsiFormatter } from './ansi';
import { createCssFormatter } from './css';
import { supportColor } from './utils';

export function createColorLogReporter(options?: ConsoleLogReporterOptions) {
  return createBaseReporter(required({ id: 'console', formatter: getFormatter() }, options))
}

function getFormatter() {
  // istanbul ignore next
  if (!supportColor()) return plainLogFormatter

  // istanbul ignore next
  return isBrowser() ? createCssFormatter() : createAnsiFormatter()
}
