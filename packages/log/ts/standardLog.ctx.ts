import { record } from 'type-plus'
import type { LogStore } from './logStore.js'
import type { LogMethodNames, StandardLogInstance } from './types.js'

export const ctx: {
	configured?: boolean
	gsl?: { store: LogStore; standardLog: StandardLogInstance<LogMethodNames> }
} = record()
