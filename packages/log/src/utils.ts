import { ProhibitedDuringProduction } from './errors';
import { store } from './store';

/**
 * Helper function to assert the system is not in production mode.
 */
export function assertLogModeIsNotProduction(action: string) {
  if (store.value.mode === 'production') throw new ProhibitedDuringProduction(action)
}
