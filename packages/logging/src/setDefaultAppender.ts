
import { Appender } from './interfaces';
import { store } from './store';

export function setDefaultAppender(defaultAppender: Appender) {
  const s = store.get()
  s.defaultAppender = defaultAppender
}
