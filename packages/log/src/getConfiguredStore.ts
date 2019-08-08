import { store } from './store';
import { config } from './config';

export function getConfiguredStore() {
  if (!store.value.configured) {
    config({})
  }
  return store
}
