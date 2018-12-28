import { getLogger as getALogger } from 'aurelia-logging';
import { Logger } from './interfaces';
import { LoggerImpl } from './Logger';
import { store } from './store';


export function getLogger(id: string, defaultLogLevel?: number): Logger {
  const { logs } = store.get()

  if (logs[id]) return logs[id]

  return logs[id] = new LoggerImpl(getALogger(id), defaultLogLevel)
}

