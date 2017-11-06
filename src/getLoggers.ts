/*
 * Copyright(c) Palo Alto Networks, Inc.
 * Created by hwong on 01/09/2016
 */
import { store } from './store'
import { Logger } from './interfaces'

/**
 * Get loggers based on RegExp.
 * @param filter RegExp to look for loggers
 */
export function getLoggers(filter: RegExp): Logger[] {
  const { logs } = store.get()
  const keys = Object.keys(logs).filter(id => filter.test(id))
  return keys.map(k => logs[k])
}
