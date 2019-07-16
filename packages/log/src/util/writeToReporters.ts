import { LogEntry, LogReporter } from '../types';

export function writeToReporters(reporters: LogReporter[], logEntry: LogEntry) {
  reporters.forEach(r => r.write(logEntry))
}
