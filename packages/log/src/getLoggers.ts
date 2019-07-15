import { Logger } from 'standard-log-core';
import { store } from './store';
import { filterKey } from 'type-plus';

/**
 * Get loggers based on RegExp.
 * @param filter RegExp to look for loggers
 */
export function getLoggers(filter: RegExp): Logger<any>[] {
  const { loggers } = store.get()
  return filterKey(loggers, id => filter.test(id)).map(k => loggers[k])
}
