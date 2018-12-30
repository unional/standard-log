import { Appender } from './interfaces';
import { store } from './store';

let hasAppenders: boolean
export function hasAppender() {
  return hasAppenders
}

export function addAppender(appender: Appender) {
  store.get().appenders.push(appender)
  hasAppenders = true
}

export function removeAppender(appender: Appender) {
  const apps = store.get().appenders = store.get().appenders.filter(a => a !== appender)
  hasAppenders = apps && apps.length > 0
}

export function clearAppenders() {
  store.get().appenders = []
  hasAppenders = false
}

export function getAppenders() {
  return store.get().appenders
}
