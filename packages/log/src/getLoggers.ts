import { filterKey } from 'type-plus';
import { store } from './store';
import { Logger } from './types';

/**
 * Get loggers based on RegExp.
 * @param filter RegExp to look for loggers
 */
export function getLoggers(filter: RegExp): Logger<any>[] {
  const { loggerClosures } = store.value
  return filterKey(loggerClosures, id => filter.test(id)).map(k => loggerClosures[k].logger)
}
