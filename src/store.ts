import { create, Store } from 'global-store'

import { Logger } from './interfaces'

export interface LoggingStore {
  logs: { [id: string]: Logger }
}

const defaultValue: LoggingStore = {
  logs: {}
}

export const store: Store<LoggingStore> = create('@unional/logging', defaultValue)
