import { Appender } from 'aurelia-logging';
import { create } from 'global-store';
import { Logger } from './interfaces';


export interface LoggingStore {
  defaultAppender?: Appender
  logs: { [id: string]: Logger },
}

const defaultValue: LoggingStore = {
  logs: {}
}

export const store = create('@unional/logging', defaultValue)
