import { test } from 'ava'
import { MemoryAppender } from 'aurelia-logging-memory'

import { getLogger, addAppender, removeAppender, setLevel, logLevel } from './index'

let appender
test.before(() => {
  appender = new MemoryAppender()
  addAppender(appender)
})

test.beforeEach(() => {
  setLevel(logLevel.error)
})

test.afterEach(() => {
  appender.logs = []
})

test.after(() => {
  removeAppender(appender)
})

function assertLoggedAtLevel(t, log, level) {
  setLevel(level)
  const msg = `should log on level: ${level}`
  log[log.id](msg)
  t.deepEqual(appender.logs, [{ id: log.id, level: logLevel[log.id], messages: [msg] }])
}

function assertNotLoggedAtLevel(t, log, level) {
  setLevel(level)
  log[log.id](`should not log on level: ${level}`)
  t.deepEqual(appender.logs, [])
}

function assertLoggedAtLocalLevel(t, log, globalLevel, localLevel) {
  setLevel(globalLevel)
  log.setLevel(localLevel)

  const msg = `should log on level: ${localLevel}`
  log[log.id](msg)
  t.deepEqual(appender.logs, [{ id: log.id, level: logLevel[log.id], messages: [msg] }])
}

function assertNotLoggedAtLocalLevel(t, log, globalLevel, localLevel) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  log[log.id](`should not log on level: ${localLevel}`)
  t.deepEqual(appender.logs, [])
}

function assertLogFunctionCalledAtLevel(t, log, level) {
  setLevel(level)
  t.plan(1)
  log[log.id](() => t.pass())
}

function assertLogFunctionCalledAtLocalLevel(t, log, globalLevel, localLevel) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  t.plan(1)
  log[log.id](() => t.pass())
}

function assertLogFunctionNotCalledAtLevel(t, log, level) {
  setLevel(level)
  t.plan(0)
  log[log.id](() => t.fail())
}

function assertLogFunctionNotCalledAtLocalLevel(t, log, globalLevel, localLevel) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  t.plan(0)
  log[log.id](() => t.fail())
}

const logLevelNameMap = {
  0: 'none',
  1: 'error',
  2: 'warn',
  3: 'info'
}

function shouldLog(method, level) {
  const name = logLevelNameMap[level]
  test(`${method}() should log on level: ${name} (${level})`, t => {
    const log = getLogger(method)

    assertLoggedAtLevel(t, log, level)
  })
}

function shouldNotLog(method, level) {
  const name = logLevelNameMap[level]
  test(`${method}() should not log on level: ${name} (${level})`, t => {
    const log = getLogger(method)

    assertNotLoggedAtLevel(t, log, level)
  })
}

function shouldLogWithLocalLevelOverride(method, localLevel) {
  const localName = logLevelNameMap[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = logLevelNameMap[globalLevel]
    test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, t => {
      const log = getLogger(method)

      assertLoggedAtLocalLevel(t, log, globalLevel, localLevel)
    })
  })
}

function shouldNotLogWithLocalLevelOverride(method, localLevel) {
  const localName = logLevelNameMap[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = logLevelNameMap[globalLevel]
    test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, t => {
      const log = getLogger(method)

      assertNotLoggedAtLocalLevel(t, log, globalLevel, localLevel)
    })
  })
}

function shouldCallLogFunction(method, level) {
  const name = logLevelNameMap[level]
  test(`${method}() should call log function on level: ${name} (${level})`, t => {
    const log = getLogger(method)

    assertLogFunctionCalledAtLevel(t, log, level)
  })
}

function shouldNotCallLogFunction(method, level) {
  const name = logLevelNameMap[level]
  test(`${method}() should not call log function on level: ${name} (${level})`, t => {
    const log = getLogger(method)

    assertLogFunctionNotCalledAtLevel(t, log, level)
  })
}

function shouldCallLogFunctionWithLocalLevelOverride(method, localLevel) {
  const localName = logLevelNameMap[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = logLevelNameMap[globalLevel]
    test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, t => {
      const log = getLogger(method)

      assertLogFunctionCalledAtLocalLevel(t, log, globalLevel, localLevel)
    })
  })
}

function shouldNotCallLogFunctionWithLocalLevelOverride(method, localLevel) {
  const localName = logLevelNameMap[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = logLevelNameMap[globalLevel]
    test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, t => {
      const log = getLogger(method)

      assertLogFunctionNotCalledAtLocalLevel(t, log, globalLevel, localLevel)
    })
  })
}

shouldNotLog('error', logLevel.none)
shouldLog('error', logLevel.error)
shouldLog('error', logLevel.warn)
shouldLog('error', logLevel.info)
shouldLog('error', logLevel.debug)
shouldNotLogWithLocalLevelOverride('error', logLevel.none)
shouldLogWithLocalLevelOverride('error', logLevel.error)
shouldLogWithLocalLevelOverride('error', logLevel.warn)
shouldLogWithLocalLevelOverride('error', logLevel.info)
shouldLogWithLocalLevelOverride('error', logLevel.debug)

shouldNotLog('warn', logLevel.none)
shouldNotLog('warn', logLevel.error)
shouldLog('warn', logLevel.warn)
shouldLog('warn', logLevel.info)
shouldLog('warn', logLevel.debug)
shouldNotLogWithLocalLevelOverride('warn', logLevel.none)
shouldNotLogWithLocalLevelOverride('warn', logLevel.error)
shouldLogWithLocalLevelOverride('warn', logLevel.warn)
shouldLogWithLocalLevelOverride('warn', logLevel.info)
shouldLogWithLocalLevelOverride('warn', logLevel.debug)

shouldNotLog('info', logLevel.none)
shouldNotLog('info', logLevel.error)
shouldNotLog('info', logLevel.warn)
shouldLog('info', logLevel.info)
shouldLog('info', logLevel.debug)
shouldNotLogWithLocalLevelOverride('info', logLevel.none)
shouldNotLogWithLocalLevelOverride('info', logLevel.error)
shouldNotLogWithLocalLevelOverride('info', logLevel.warn)
shouldLogWithLocalLevelOverride('info', logLevel.info)
shouldLogWithLocalLevelOverride('info', logLevel.debug)

shouldNotLog('debug', logLevel.none)
shouldNotLog('debug', logLevel.error)
shouldNotLog('debug', logLevel.warn)
shouldNotLog('debug', logLevel.info)
shouldLog('debug', logLevel.debug)
shouldNotLogWithLocalLevelOverride('debug', logLevel.none)
shouldNotLogWithLocalLevelOverride('debug', logLevel.error)
shouldNotLogWithLocalLevelOverride('debug', logLevel.warn)
shouldNotLogWithLocalLevelOverride('debug', logLevel.info)
shouldLogWithLocalLevelOverride('debug', logLevel.debug)

shouldNotCallLogFunction('onError', logLevel.none)
shouldCallLogFunction('onError', logLevel.error)
shouldCallLogFunction('onError', logLevel.warn)
shouldCallLogFunction('onError', logLevel.info)
shouldCallLogFunction('onError', logLevel.debug)
shouldNotCallLogFunctionWithLocalLevelOverride('onError', logLevel.none)
shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.error)
shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.warn)
shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.info)
shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.debug)

shouldNotCallLogFunction('onWarn', logLevel.none)
shouldNotCallLogFunction('onWarn', logLevel.error)
shouldCallLogFunction('onWarn', logLevel.warn)
shouldCallLogFunction('onWarn', logLevel.info)
shouldCallLogFunction('onWarn', logLevel.debug)
shouldNotCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.none)
shouldNotCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.error)
shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.warn)
shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.info)
shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.debug)

shouldNotCallLogFunction('onInfo', logLevel.none)
shouldNotCallLogFunction('onInfo', logLevel.error)
shouldNotCallLogFunction('onInfo', logLevel.warn)
shouldCallLogFunction('onInfo', logLevel.info)
shouldCallLogFunction('onInfo', logLevel.debug)
shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.none)
shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.error)
shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.warn)
shouldCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.info)
shouldCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.debug)

shouldNotCallLogFunction('onDebug', logLevel.none)
shouldNotCallLogFunction('onDebug', logLevel.error)
shouldNotCallLogFunction('onDebug', logLevel.warn)
shouldNotCallLogFunction('onDebug', logLevel.info)
shouldCallLogFunction('onDebug', logLevel.debug)
shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.none)
shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.error)
shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.warn)
shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.info)
shouldCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.debug)
