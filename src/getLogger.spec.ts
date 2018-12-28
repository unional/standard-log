import t from 'assert';
import { MemoryAppender } from 'aurelia-logging-memory';
import { addAppender, getLogger, logLevel, removeAppender, setLevel } from './index';
import { logLevelNameMap } from './utils';


let appender: MemoryAppender
beforeAll(() => {
  appender = new MemoryAppender()
  addAppender(appender)
})

beforeEach(() => {
  setLevel(logLevel.error)
})

afterEach(() => {
  appender.logs = []
})

afterAll(() => {
  removeAppender(appender)
})

function assertLoggedAtLevel(log: any, level: any) {
  setLevel(level)
  const msg = `should log on level: ${level}`
  log[log.id](msg)
  t.deepStrictEqual(appender.logs, [{ id: log.id, level: logLevel[log.id], messages: [msg] }])
}

function assertNotLoggedAtLevel(log: any, level: any) {
  setLevel(level)
  log[log.id](`should not log on level: ${level}`)
  t.deepStrictEqual(appender.logs, [])
}

function assertLoggedAtLocalLevel(log: any, globalLevel: any, localLevel: any) {
  setLevel(globalLevel)
  log.setLevel(localLevel)

  const msg = `should log on level: ${localLevel}`
  log[log.id](msg)
  t.deepStrictEqual(appender.logs, [{ id: log.id, level: logLevel[log.id], messages: [msg] }])
}

function assertNotLoggedAtLocalLevel(log: any, globalLevel: any, localLevel: any) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  log[log.id](`should not log on level: ${localLevel}`)
  t.deepStrictEqual(appender.logs, [])
}

function assertLogFunctionCalledAtLevel(log: any, level: any) {
  setLevel(level)
  let actual = false
  log[log.id](() => actual = true)
  t.strictEqual(actual, true)
}

function assertLogFunctionCalledAtLocalLevel(log: any, globalLevel: any, localLevel: any) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  let actual = false
  log[log.id](() => actual = true)
  t.strictEqual(actual, true)
}

function assertLogFunctionNotCalledAtLevel(log: any, level: any) {
  setLevel(level)
  // t.plan(0)
  log[log.id](() => t.fail())
}

function assertLogFunctionNotCalledAtLocalLevel(log: any, globalLevel: any, localLevel: any) {
  setLevel(globalLevel)
  log.setLevel(localLevel)
  // t.plan(0)
  log[log.id](() => t.fail())
}

function shouldLog(method: string, level: any) {
  const name = (logLevelNameMap as any)[level]
  test(`${method}() should log on level: ${name} (${level})`, () => {
    const log = getLogger(method)

    assertLoggedAtLevel(log, level)
  })
}

function shouldNotLog(method: string, level: any) {
  const name = (logLevelNameMap as any)[level]
  test(`${method}() should not log on level: ${name} (${level})`, () => {
    const log = getLogger(method)

    assertNotLoggedAtLevel(log, level)
  })
}

function shouldLogWithLocalLevelOverride(method: string, localLevel: any) {
  const localName = (logLevelNameMap as any)[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = (logLevelNameMap as any)[globalLevel]
    test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
      const log = getLogger(method)

      assertLoggedAtLocalLevel(log, globalLevel, localLevel)
    })
  })
}

function shouldNotLogWithLocalLevelOverride(method: string, localLevel: any) {
  const localName = (logLevelNameMap as any)[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = (logLevelNameMap as any)[globalLevel]
    test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
      const log = getLogger(method)

      assertNotLoggedAtLocalLevel(log, globalLevel, localLevel)
    })
  })
}

function shouldCallLogFunction(method: string, level: any) {
  const name = (logLevelNameMap as any)[level]
  test(`${method}() should call log function on level: ${name} (${level})`, () => {
    const log = getLogger(method)

    assertLogFunctionCalledAtLevel(log, level)
  })
}

function shouldNotCallLogFunction(method: string, level: any) {
  const name = (logLevelNameMap as any)[level]
  test(`${method}() should not call log function on level: ${name} (${level})`, () => {
    const log = getLogger(method)

    assertLogFunctionNotCalledAtLevel(log, level)
  })
}

function shouldCallLogFunctionWithLocalLevelOverride(method: string, localLevel: any) {
  const localName = (logLevelNameMap as any)[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = (logLevelNameMap as any)[globalLevel]
    test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
      const log = getLogger(method)

      assertLogFunctionCalledAtLocalLevel(log, globalLevel, localLevel)
    })
  })
}

function shouldNotCallLogFunctionWithLocalLevelOverride(method: string, localLevel: any) {
  const localName = (logLevelNameMap as any)[localLevel];

  [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
    const globalName = (logLevelNameMap as any)[globalLevel]
    test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
      const log = getLogger(method)

      assertLogFunctionNotCalledAtLocalLevel(log, globalLevel, localLevel)
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

test('on???() logs to corresponding log', () => {
  const log = getLogger('onXXX')
  log.setLevel(logLevel.debug)
  log.onDebug(log => log('debug'))
  log.onInfo(log => log('info'))
  log.onWarn(log => log('warn'))
  log.onError(log => log('error'))
  t.deepStrictEqual(appender.logs.map(l => l.messages[0]), [
    'debug',
    'info',
    'warn',
    'error'
  ])
})

test(`pass '() => string' into on???() will log the result`, () => {
  const log = getLogger('onXXX with () => string')
  log.setLevel(logLevel.debug)
  log.onDebug(() => 'debug')
  log.onInfo(() => 'info')
  log.onWarn(() => 'warn')
  log.onError(() => 'error')
  t.deepStrictEqual(appender.logs.map(l => l.messages[0]), [
    'debug',
    'info',
    'warn',
    'error'
  ])
})

test(`set default log level`, () => {
  let log = getLogger('defaultLogLevelDebug', logLevel.debug)
  t.strictEqual(log.level, logLevel.debug)

  log = getLogger('defaultLogLevelError', logLevel.error)
  t.strictEqual(log.level, logLevel.error)
})
