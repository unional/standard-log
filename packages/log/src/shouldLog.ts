import { store } from './store';

/**
 * Determines should you log.
 * @param loggerLevel Log level of the logger.
 * It can be undefined which the global log level will be used.
 */
export function shouldLog(targetLevel: number, loggerLevel: number | undefined) {
  return targetLevel <= (loggerLevel !== undefined ? loggerLevel : store.get().logLevel)
}
