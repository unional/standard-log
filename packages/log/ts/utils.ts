import { AnyFunction } from 'type-plus'
import { ProhibitedDuringProduction } from './errors.js'
import { store } from './store.js'

/**
 * Helper function to assert the system is not in production mode.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function assertLogModeIsNotProduction(action: string, ssf: AnyFunction) {
  if (store.value.mode === 'production') throw new ProhibitedDuringProduction(action, { ssf })
}
