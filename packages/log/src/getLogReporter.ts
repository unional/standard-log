import { store } from './store';

export function getLogReporter(id: string) {
  return store.get().reporters.find(r => r.id === id)
}
