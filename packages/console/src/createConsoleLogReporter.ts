import { LogEntry, LogFormatter, LogReporter } from 'standard-log-core';
import { getField } from 'type-plus';
import { createAnsiFormatter } from './ansi/ansiFormatter';
import { createCssFormatter } from './css/cssFormatter';
import { isBrowser, supportColor } from './environment';
import { plainFormatter } from './plainFormatter';
import { polyfilledConsole } from './polyfilledConsole';
import { toConsoleMethod } from './utils';

export type ConsoleLogReporter = LogReporter<any[]>

export type ConsoleLogReporterFormatterOptions = {
  id: string,
  formatter: LogFormatter<any[]>
}

export type ConsoleLogReporterTemplateOptions = {
  id: string,
  useColor: boolean,
  template: string
}

export type ConsoleLogReporterOptions = ConsoleLogReporterFormatterOptions | ConsoleLogReporterTemplateOptions

export function createConsoleLogReporter(options: Partial<ConsoleLogReporterOptions> = {}) {
  const id = getField(options, 'id', 'console')
  const formatter = getFormatter(options)
  return {
    id,
    formatter,
    console: polyfilledConsole,
    write(entry: LogEntry) {
      if (this.filter && !this.filter(entry)) return
      const values = (this.formatter || formatter)(entry)
      const method = toConsoleMethod(entry.level)
      this.console[method](...values)
    }
  } as LogReporter<any[]> & { console: typeof polyfilledConsole }
}

function getFormatter(options: any) {
  if (options.formatter) return options.formatter

  if (options.useColor === false || !supportColor()) {
    return plainFormatter
  }
  if (isBrowser()) {
    // istanbul ignore next
    return createCssFormatter(options)
  }
  else {
    return createAnsiFormatter(options)
  }
}
