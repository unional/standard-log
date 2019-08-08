import { store } from './store';
import { LogLevel } from './types';

/**
 * Determines should you log.
 * @param loggerLevel Log level of the logger.
 * It can be undefined which the global log level will be used.
 */
export function shouldLog(targetLevel: LogLevel, loggerLevel: LogLevel | undefined) {
  return targetLevel <= (loggerLevel !== undefined ? loggerLevel : store.value.logLevel)
}
