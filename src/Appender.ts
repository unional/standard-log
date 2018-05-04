import { addAppender as addAL, Appender, removeAppender as rmAL, clearAppenders as clearAL, getAppenders } from 'aurelia-logging'

export { Appender, getAppenders }

let hasAppenders: boolean
export function hasAppender() {
  return hasAppenders
}

export function addAppender(appender: Appender) {
  addAL(appender)
  hasAppenders = true
}

export function removeAppender(appender: Appender) {
  rmAL(appender)
  const apps = getAppenders()
  hasAppenders = apps && apps.length > 0
}

export function clearAppenders() {
  clearAL()
  hasAppenders = false
}
