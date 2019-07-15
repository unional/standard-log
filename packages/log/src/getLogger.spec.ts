import a from 'assertron';
import { addCustomLogLevel, clearCustomLogLevel, logLevel, LogMethodNames, toLogLevel, toLogLevelName } from 'standard-log-core';
import { createMemoryLogReporter, MemoryLogReporter } from 'standard-log-memory';
import { addLogReporter, config, getLogger, InvalidId } from '.';
import { setLogLevel } from './logLevel';
import { resetStore, store } from './store';

afterEach(() => {
  clearCustomLogLevel()
  resetStore()
})

test('logger id supports alphanumeric and :_-.', () => {
  getLogger('abcdefghijklmnopqrstuvwxyz:-_.1234567890')
})

test('logger id supports unicode', () => {
  getLogger('ミク香港')
})

test.each('`~!@#$%^&*()=+\\/|[]{}<>,?'.split(''))('throws if id has unsupported character %s', (char: string) => {
  a.throws(() => getLogger(char), InvalidId)
})

test('logger with custom level', () => {
  config({ mode: 'devel' })
  const reporter = createMemoryLogReporter()
  addLogReporter(reporter)
  addCustomLogLevel('cust_lvl', 100)
  const logger = getLogger<'cust_lvl'>('cust')

  logger.cust_lvl('a', 'b')

  a.satisfies(reporter.logs, [{ id: 'cust', level: 100, args: ['a', 'b'] }])
})

test('get logger with same name gets the same instance', () => {
  const expected = getLogger('same-inst')
  const actual = getLogger('same-inst')
  expect(actual).toBe(expected)
})

test('new logger will get custom level', () => {
  addCustomLogLevel('to_logger', 1234)
  const actual = getLogger<LogMethodNames | 'to_logger'>('to_logger_logger')
  expect(typeof actual.to_logger).toBe('function')
})

test('existing logger will get custom level', () => {
  const actual = getLogger<LogMethodNames | 'old_logger'>('old_logger')
  addCustomLogLevel('old_logger', 122)
  expect(typeof actual.old_logger).toBe('function')
})

describe('count()', () => {
  test('will increment the counter', () => {
    const reporter = createMemoryLogReporter()
    config({ mode: 'devel', reporters: [reporter], logLevel: logLevel.debug })
    const logger = getLogger('inc counter')
    logger.count()
    logger.count()

    a.satisfies(reporter.logs, [
      { id: 'inc counter', level: logLevel.debug, args: [1] },
      { id: 'inc counter', level: logLevel.debug, args: [2] }
    ])
  })

  test('append args after the counter', () => {
    const reporter = createMemoryLogReporter()
    config({ reporters: [reporter], logLevel: logLevel.debug })
    const id = 'inc with args';
    const logger = getLogger(id)
    logger.count('msg1', 'msg2')

    a.satisfies(reporter.logs, [
      { id, level: logLevel.debug, args: [1, 'msg1', 'msg2'] }
    ])
  })
})

describe('on()', () => {
  let reporter: MemoryLogReporter

  beforeEach(() => {
    reporter = createMemoryLogReporter()
    store.get().reporters = [reporter]
    setLogLevel(logLevel.error)
  })

  afterAll(() => {
    resetStore()
  })

  function assertLoggedAtLevel(log: any, level: number) {
    setLogLevel(level)
    const msg = `should log on level: ${level}`
    log[log.id](msg)
    a.satisfies(reporter.logs, [{ id: log.id, level: toLogLevel(log.id), args: [msg] }])
  }

  function assertNotLoggedAtLevel(log: any, level: number) {
    setLogLevel(level)
    log[log.id](`should not log on level: ${level}`)
    expect(reporter.logs).toEqual([])
  }

  function assertLoggedAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel

    const msg = `should log on level: ${localLevel}`
    log[log.id](msg)
    expect(reporter.logs).toEqual([{ id: log.id, level: toLogLevel(log.id), messages: [msg] }])
  }

  function assertNotLoggedAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    log[log.id](`should not log on level: ${localLevel}`)
    expect(reporter.logs).toEqual([])
  }

  function assertLogFunctionCalledAtLevel(log: any, level: number) {
    setLogLevel(level)
    let actual = false
    log[log.id](() => actual = true)
    expect(actual).toBe(true)
  }

  function assertLogFunctionCalledAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    let actual = false
    log[log.id](() => actual = true)
    expect(actual).toBe(true)
  }

  function assertLogFunctionNotCalledAtLevel(log: any, level: number) {
    setLogLevel(level)
    log[log.id](() => { throw new Error(`should not log at level ${level}`) })
  }

  function assertLogFunctionNotCalledAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    log[log.id](() => { throw new Error(`should not log at local level ${localLevel}`) })
  }

  function shouldLog(method: string, level: number) {
    const name = toLogLevelName(level)
    test(`${method}() should log on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertLoggedAtLevel(log, level)
    })
  }

  function shouldNotLog(method: string, level: number) {
    const name = toLogLevelName(level)
    test(`${method}() should not log on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertNotLoggedAtLevel(log, level)
    })
  }

  function shouldLogWithLocalLevelOverride(method: string, localLevel: number) {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertLoggedAtLocalLevel(log, globalLevel, localLevel)
      })
    })
  }

  function shouldNotLogWithLocalLevelOverride(method: string, localLevel: number) {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertNotLoggedAtLocalLevel(log, globalLevel, localLevel)
      })
    })
  }

  function shouldCallLogFunction(method: string, level: number) {
    const name = toLogLevelName(level) || 'none'
    test(`${method}() should call log function on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertLogFunctionCalledAtLevel(log, level)
    })
  }

  function shouldNotCallLogFunction(method: string, level: number) {
    const name = toLogLevelName(level) || 'none'
    test(`${method}() should not call log function on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertLogFunctionNotCalledAtLevel(log, level)
    })
  }

  function shouldCallLogFunctionWithLocalLevelOverride(method: string, localLevel: number) {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertLogFunctionCalledAtLocalLevel(log, globalLevel, localLevel)
      })
    })
  }

  function shouldNotCallLogFunctionWithLocalLevelOverride(method: string, localLevel: number) {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
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
  // shouldNotLogWithLocalLevelOverride('error', logLevel.none)
  // shouldLogWithLocalLevelOverride('error', logLevel.error)
  // shouldLogWithLocalLevelOverride('error', logLevel.warn)
  // shouldLogWithLocalLevelOverride('error', logLevel.info)
  // shouldLogWithLocalLevelOverride('error', logLevel.debug)

  shouldNotLog('warn', logLevel.none)
  shouldNotLog('warn', logLevel.error)
  shouldLog('warn', logLevel.warn)
  shouldLog('warn', logLevel.info)
  shouldLog('warn', logLevel.debug)
  // shouldNotLogWithLocalLevelOverride('warn', logLevel.none)
  // shouldNotLogWithLocalLevelOverride('warn', logLevel.error)
  // shouldLogWithLocalLevelOverride('warn', logLevel.warn)
  // shouldLogWithLocalLevelOverride('warn', logLevel.info)
  // shouldLogWithLocalLevelOverride('warn', logLevel.debug)

  shouldNotLog('info', logLevel.none)
  shouldNotLog('info', logLevel.error)
  shouldNotLog('info', logLevel.warn)
  shouldLog('info', logLevel.info)
  shouldLog('info', logLevel.debug)
  // shouldNotLogWithLocalLevelOverride('info', logLevel.none)
  // shouldNotLogWithLocalLevelOverride('info', logLevel.error)
  // shouldNotLogWithLocalLevelOverride('info', logLevel.warn)
  // shouldLogWithLocalLevelOverride('info', logLevel.info)
  // shouldLogWithLocalLevelOverride('info', logLevel.debug)

  shouldNotLog('debug', logLevel.none)
  shouldNotLog('debug', logLevel.error)
  shouldNotLog('debug', logLevel.warn)
  shouldNotLog('debug', logLevel.info)
  shouldLog('debug', logLevel.debug)
  // shouldNotLogWithLocalLevelOverride('debug', logLevel.none)
  // shouldNotLogWithLocalLevelOverride('debug', logLevel.error)
  // shouldNotLogWithLocalLevelOverride('debug', logLevel.warn)
  // shouldNotLogWithLocalLevelOverride('debug', logLevel.info)
  // shouldLogWithLocalLevelOverride('debug', logLevel.debug)

  // shouldNotCallLogFunction('onError', logLevel.none)
  // shouldCallLogFunction('onError', logLevel.error)
  // shouldCallLogFunction('onError', logLevel.warn)
  // shouldCallLogFunction('onError', logLevel.info)
  // shouldCallLogFunction('onError', logLevel.debug)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onError', logLevel.none)
  // shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.error)
  // shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.warn)
  // shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.info)
  // shouldCallLogFunctionWithLocalLevelOverride('onError', logLevel.debug)

  // shouldNotCallLogFunction('onWarn', logLevel.none)
  // shouldNotCallLogFunction('onWarn', logLevel.error)
  // shouldCallLogFunction('onWarn', logLevel.warn)
  // shouldCallLogFunction('onWarn', logLevel.info)
  // shouldCallLogFunction('onWarn', logLevel.debug)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.none)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.error)
  // shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.warn)
  // shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.info)
  // shouldCallLogFunctionWithLocalLevelOverride('onWarn', logLevel.debug)

  // shouldNotCallLogFunction('onInfo', logLevel.none)
  // shouldNotCallLogFunction('onInfo', logLevel.error)
  // shouldNotCallLogFunction('onInfo', logLevel.warn)
  // shouldCallLogFunction('onInfo', logLevel.info)
  // shouldCallLogFunction('onInfo', logLevel.debug)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.none)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.error)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.warn)
  // shouldCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.info)
  // shouldCallLogFunctionWithLocalLevelOverride('onInfo', logLevel.debug)

  // shouldNotCallLogFunction('onDebug', logLevel.none)
  // shouldNotCallLogFunction('onDebug', logLevel.error)
  // shouldNotCallLogFunction('onDebug', logLevel.warn)
  // shouldNotCallLogFunction('onDebug', logLevel.info)
  // shouldCallLogFunction('onDebug', logLevel.debug)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.none)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.error)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.warn)
  // shouldNotCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.info)
  // shouldCallLogFunctionWithLocalLevelOverride('onDebug', logLevel.debug)
})
