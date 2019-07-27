import a from 'assertron';
import { addCustomLogLevel, addLogReporter, clearCustomLogLevel, config, createMemoryLogReporter, getLogger, InvalidId, logLevel, LogMethodNames, MemoryLogReporter, setLogLevel, toLogLevel, toLogLevelName } from '.';
import { store } from './store';

afterEach(() => {
  clearCustomLogLevel()
  store.reset()
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

test('can specify local log level', () => {
  const log = getLogger('local', logLevel.trace)
  expect(log.level).toBe(logLevel.trace)
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
    config({ mode: 'test', reporters: [reporter] })
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

describe('log level tests', () => {
  let reporter: MemoryLogReporter

  beforeEach(() => {
    reporter = createMemoryLogReporter()
    store.value.reporters = [reporter]
    setLogLevel(logLevel.error)
  })

  afterAll(() => {
    store.reset()
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
    a.satisfies(reporter.logs, [{ id: log.id, level: toLogLevel(log.id), args: [msg] }])
  }

  function assertNotLoggedAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    log[log.id](`should not log on level: ${localLevel}`)
    expect(reporter.logs).toEqual([])
  }

  function assertLogFunctionCalledAtLevel(log: any, callLevel: number, actualLevel: number) {
    setLogLevel(actualLevel)
    let actual = false
    log.on(callLevel, () => actual = true)
    expect(actual).toBe(true)
  }

  function assertLogFunctionCalledAtLocalLevel(log: any, callLevel: number, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    let actual = false
    log.on(callLevel, () => actual = true)
    expect(actual).toBe(true)
  }

  function assertLogFunctionNotCalledAtLevel(log: any, callLevel: number, actualLevel: number) {
    setLogLevel(actualLevel)
    log.on(callLevel, () => { throw new Error(`should not log at level ${actualLevel}`) })
  }

  function assertLogFunctionNotCalledAtLocalLevel(log: any, callLevel: number, globalLevel: number, localLevel: number) {
    setLogLevel(globalLevel)
    log.level = localLevel
    log.on(callLevel, () => { throw new Error(`should not log at local level ${localLevel}`) })
  }

  const shouldLog = wrapTest((test) => (method: string, level: number) => {
    const name = toLogLevelName(level)
    test(`${method}() should log on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertLoggedAtLevel(log, level)
    })
  })

  const shouldNotLog = wrapTest((test) => (method: string, level: number) => {
    const name = toLogLevelName(level)
    test(`${method}() should not log on level: ${name} (${level})`, () => {
      const log = getLogger(method)

      assertNotLoggedAtLevel(log, level)
    })
  })

  const shouldLogWithLocalLevelOverride = wrapTest((test) => (method: string, localLevel: number) => {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertLoggedAtLocalLevel(log, globalLevel, localLevel)
      })
    })
  })

  const shouldNotLogWithLocalLevelOverride = wrapTest((test) => (method: string, localLevel: number) => {
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertNotLoggedAtLocalLevel(log, globalLevel, localLevel)
      })
    })
  })

  const shouldCallLogFunction = wrapTest((test) => (callLevel: number, actualLevel: number) => {
    const method = toLogLevelName(callLevel)
    const name = toLogLevelName(actualLevel)
    test(`${method}() should call log function on level: ${name} (${actualLevel})`, () => {
      const log = getLogger(method)

      assertLogFunctionCalledAtLevel(log, callLevel, actualLevel)
    })
  })

  const shouldNotCallLogFunction = wrapTest((test) => (callLevel: number, actualLevel: number) => {
    const method = toLogLevelName(callLevel)
    const name = toLogLevelName(actualLevel)
    test(`${method}() should not call log function on level: ${name} (${actualLevel})`, () => {
      const log = getLogger(method)

      assertLogFunctionNotCalledAtLevel(log, callLevel, actualLevel)
    })
  })

  const shouldCallLogFunctionWithLocalLevelOverride = wrapTest((test) => (callLevel: number, localLevel: number) => {
    const method = toLogLevelName(callLevel)
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertLogFunctionCalledAtLocalLevel(log, callLevel, globalLevel, localLevel)
      })
    })
  })

  const shouldNotCallLogFunctionWithLocalLevelOverride = wrapTest((test) => (callLevel: number, localLevel: number) => {
    const method = toLogLevelName(callLevel)
    const localName = toLogLevelName(localLevel);

    [logLevel.none, logLevel.error, logLevel.warn, logLevel.info, logLevel.debug].forEach(globalLevel => {
      const globalName = toLogLevelName(globalLevel) || 'none'
      test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
        const log = getLogger(method)

        assertLogFunctionNotCalledAtLocalLevel(log, callLevel, globalLevel, localLevel)
      })
    })
  })

  function wrapTest<F>(fn: (test: jest.It) => F) {
    return Object.assign(fn(test), { only: fn(test.only), skip: fn(test.skip) })
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

  shouldNotCallLogFunction(logLevel.error, logLevel.none)
  shouldCallLogFunction(logLevel.error, logLevel.error)
  shouldCallLogFunction(logLevel.error, logLevel.warn)
  shouldCallLogFunction(logLevel.error, logLevel.info)
  shouldCallLogFunction(logLevel.error, logLevel.debug)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.error, logLevel.none)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.error, logLevel.error)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.error, logLevel.warn)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.error, logLevel.info)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.error, logLevel.debug)

  shouldNotCallLogFunction(logLevel.warn, logLevel.none)
  shouldNotCallLogFunction(logLevel.warn, logLevel.error)
  shouldCallLogFunction(logLevel.warn, logLevel.warn)
  shouldCallLogFunction(logLevel.warn, logLevel.info)
  shouldCallLogFunction(logLevel.warn, logLevel.debug)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.warn, logLevel.none)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.warn, logLevel.error)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.warn, logLevel.warn)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.warn, logLevel.info)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.warn, logLevel.debug)

  shouldNotCallLogFunction(logLevel.info, logLevel.none)
  shouldNotCallLogFunction(logLevel.info, logLevel.error)
  shouldNotCallLogFunction(logLevel.info, logLevel.warn)
  shouldCallLogFunction(logLevel.info, logLevel.info)
  shouldCallLogFunction(logLevel.info, logLevel.debug)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.info, logLevel.none)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.info, logLevel.error)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.info, logLevel.warn)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.info, logLevel.info)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.info, logLevel.debug)

  shouldNotCallLogFunction(logLevel.debug, logLevel.none)
  shouldNotCallLogFunction(logLevel.debug, logLevel.error)
  shouldNotCallLogFunction(logLevel.debug, logLevel.warn)
  shouldNotCallLogFunction(logLevel.debug, logLevel.info)
  shouldCallLogFunction(logLevel.debug, logLevel.debug)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.debug, logLevel.none)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.debug, logLevel.error)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.debug, logLevel.warn)
  shouldNotCallLogFunctionWithLocalLevelOverride(logLevel.debug, logLevel.info)
  shouldCallLogFunctionWithLocalLevelOverride(logLevel.debug, logLevel.debug)
})

test('on() can take log level name in first argument', () => {
  const log = getLogger('string-on')
  log.on('debug', () => { return })
})
