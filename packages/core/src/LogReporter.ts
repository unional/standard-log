import { store } from './store';
import { LogEntry, LogFilter, LogFormatter } from './types';

export type LogReporter<T = any> = {
  id: string
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  formatter?: LogFormatter<T>
  write(entry: LogEntry): void
}

export type LogReporterOptions<T = any> = {
  id?: string
  /**
   * Specifies the formatter to be used by the reporter.
   * Using this you can customize how the reporter writes the log entry.
   */
  formatter?: LogFormatter<T>
  /**
   * Specifies a filter to determine should the log be written.
   */
  filter?: LogFilter
}

export function getLogReporter(id: string) {
  return store.value.reporters.find(r => r.id === id)
}
