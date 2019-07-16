import { filterKey } from 'type-plus';

export function filterById<T>(loggers: Record<string, T>, filter: RegExp) {
  return filterKey(loggers, id => filter.test(id)).map(k => loggers[k])
}
