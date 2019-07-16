import { store } from '../store';
import { Logger } from '../types';
import { filterById } from '../util';

/**
 * Get loggers based on RegExp.
 * @param filter RegExp to look for loggers
 */
export function getLoggers(filter: RegExp): Logger<any>[] {
  const { loggers } = store.get()
  return filterById(loggers, filter)
}
