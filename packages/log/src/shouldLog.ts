import { store } from './store';

export function shouldLog(level: number, localLevel?: number) {
  return level <= (localLevel !== undefined ? localLevel : store.get().logLevel)
}
