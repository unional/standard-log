import { create } from 'global-store';
import { Appender, Logger } from './interfaces';

import { ConsoleAppender } from 'aurelia-logging-console'
export interface LoggingStore {
  defaultAppender: Appender
  logs: { [id: string]: Logger },
  appenders: Appender[]
}

const defaultValue: LoggingStore = {
  defaultAppender: new ConsoleAppender(),
  logs: {},
  appenders: []
}

export const store = create('@unional/logging', defaultValue)
