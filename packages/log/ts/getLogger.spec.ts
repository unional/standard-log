import a from 'assertron'
import delay from 'delay'
import { addCustomLogLevel, clearCustomLogLevel, getLogger, InvalidId, Logger, logLevels, LogMethodNames, setLogLevel, toLogLevel, toLogLevelName } from './index.js'
import { config } from './config.js'
import { createMemoryLogReporter, MemoryLogReporter } from './memory.js'
import { store } from './store.js'
import { assertSSF, captureWrittenLog } from './testUtil.js'

afterEach(() => {
  clearCustomLogLevel()
  store.reset()
})

test.skip('logger id supports alphanumeric and :_-.', () => {
  getLogger('abcdefghijklmnopqrstuvwxyz:-_.1234567890')
})

test.skip('logger id supports unicode', () => {
  getLogger('ミク香港')
})

test.skip('logger id supports @, \\ and /', () => {
  getLogger('@unional/fixture')
  getLogger(`a\\b\\c`)
})

test.skip.each('`~!#$%^&*()=+|[]{}<>,?'.split(''))('throws if id has unsupported character %s', (char: string) => {
  a.throws(() => getLogger(char), InvalidId)
})

it.skip('throw InvalidId with ssf to the call site', () => {
  const err = a.throws(() => getLogger('!'), InvalidId)

  assertSSF(err, __filename)
})

test.skip('get logger with same name gets the same instance', () => {
  const expected = getLogger('same-inst')
  const actual = getLogger('same-inst')
  expect(actual).toBe(expected)
})

test.skip('can specify local log level', () => {
  const log = getLogger('local', { level: logLevels.trace })
  expect(log.level).toBe(logLevels.trace)
})

test.skip('new logger will get custom level', () => {
  addCustomLogLevel('to_logger', 1234)
  const actual = getLogger<LogMethodNames | 'to_logger'>('to_logger_logger')
  expect(typeof actual.to_logger).toBe('function')
})

test.skip('existing logger will get custom level', () => {
  const actual = getLogger<LogMethodNames | 'old_logger'>('old_logger')
  addCustomLogLevel('old_logger', 122)
  expect(typeof actual.old_logger).toBe('function')
})

describe('validate write to reporters', () => {
  let capture: ReturnType<typeof captureWrittenLog>
  beforeEach(() => {
    store.value.mode = 'test'
    store.value.logLevel = logLevels.debug
    capture = captureWrittenLog()
  })
  afterEach(() => {
    capture.reset()
  })
  test.skip('logger with custom level', async () => {
    addCustomLogLevel('cust_lvl', 100)
    const logger = getLogger<'cust_lvl'>('cust')
    logger.cust_lvl('a', 'b')

    a.satisfies(capture.logs, [{ id: 'cust', level: 100, args: ['a', 'b'] }])
  })
  describe.skip('count()', () => {
    test('will increment the counter', async () => {
      const logger = getLogger('inc counter')

      logger.count()
      logger.count()

      a.satisfies(capture.logs, [
        { id: 'inc counter', level: logLevels.debug, args: [1] },
        { id: 'inc counter', level: logLevels.debug, args: [2] }
      ])
    })

    test('append args after the counter', async () => {
      store.value.logLevel = logLevels.debug
      const id = 'inc with args'
      const logger = getLogger(id)
      logger.count('msg1', 'msg2')

      a.satisfies(capture.logs, [
        { id, level: logLevels.debug, args: [1, 'msg1', 'msg2'] }
      ])
    })

    test('not log if log level is less than debug', async () => {
      store.value.logLevel = logLevels.debug - 1
      const id = 'inc with args'
      const logger = getLogger(id)
      logger.count('msg1', 'msg2')

      expect(capture.logs.length).toBe(0)
    })
  })

  describe.skip('log level tests', () => {
    beforeEach(() => {
      store.value.mode = 'test'
      store.value.logLevel = logLevels.error
    })

    afterEach(() => {
      store.reset()
    })

    async function assertLoggedAtLevel(log: any, level: number) {
      setLogLevel(level)
      const msg = `should log on level: ${level}`
      log[log.id](msg)
      a.satisfies(capture.logs, [{ id: log.id, level: toLogLevel(log.id), args: [msg] }])
    }

    async function assertNotLoggedAtLevel(log: any, level: number) {
      setLogLevel(level)
      log[log.id](`should not log on level: ${level}`)
      expect(capture.logs.length).toBe(0)
    }

    async function assertLoggedAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
      setLogLevel(globalLevel)
      log.level = localLevel

      const msg = `should log on level: ${localLevel}`
      log[log.id](msg)
      a.satisfies(capture.logs, [{ id: log.id, level: toLogLevel(log.id), args: [msg] }])
    }

    async function assertNotLoggedAtLocalLevel(log: any, globalLevel: number, localLevel: number) {
      setLogLevel(globalLevel)
      log.level = localLevel
      log[log.id](`should not log on level: ${localLevel}`)
      expect(capture.logs.length).toBe(0)
    }

    async function assertLogFunctionCalledAtLevel(log: any, callLevel: number, actualLevel: number) {
      setLogLevel(actualLevel)
      let actual = false
      log.on(callLevel, () => actual = true)
      expect(actual).toBe(true)
    }

    async function assertLogFunctionCalledAtLocalLevel(log: Logger, callLevel: number, globalLevel: number, localLevel: number) {
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

        return assertLoggedAtLevel(log, level)
      })
    })

    const shouldNotLog = wrapTest((test) => (method: string, level: number) => {
      const name = toLogLevelName(level)
      test(`${method}() should not log on level: ${name} (${level})`, () => {
        const log = getLogger(method)

        return assertNotLoggedAtLevel(log, level)
      })
    })

    const shouldLogWithLocalLevelOverride = wrapTest((test) => (method: string, localLevel: number) => {
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const log = getLogger(method)

          return assertLoggedAtLocalLevel(log, globalLevel, localLevel)
        })
      })
    })

    const shouldNotLogWithLocalLevelOverride = wrapTest((test) => (method: string, localLevel: number) => {
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const log = getLogger(method)

          return assertNotLoggedAtLocalLevel(log, globalLevel, localLevel)
        })
      })
    })

    const shouldCallLogFunction = wrapTest((test) => (callLevel: number, actualLevel: number) => {
      const method = toLogLevelName(callLevel)
      const name = toLogLevelName(actualLevel)
      test(`${method}() should call log function on level: ${name} (${actualLevel})`, () => {
        const log = getLogger(method)

        return assertLogFunctionCalledAtLevel(log, callLevel, actualLevel)
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

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const log = getLogger(method)

          return assertLogFunctionCalledAtLocalLevel(log, callLevel, globalLevel, localLevel)
        })
      })
    })

    const shouldNotCallLogFunctionWithLocalLevelOverride = wrapTest((test) => (callLevel: number, localLevel: number) => {
      const method = toLogLevelName(callLevel)
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
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

    shouldNotLog('error', logLevels.none)
    shouldLog('error', logLevels.error)
    shouldLog('error', logLevels.warn)
    shouldLog('error', logLevels.info)
    shouldLog('error', logLevels.debug)
    shouldNotLogWithLocalLevelOverride('error', logLevels.none)
    shouldLogWithLocalLevelOverride('error', logLevels.error)
    shouldLogWithLocalLevelOverride('error', logLevels.warn)
    shouldLogWithLocalLevelOverride('error', logLevels.info)
    shouldLogWithLocalLevelOverride('error', logLevels.debug)

    shouldNotLog('warn', logLevels.none)
    shouldNotLog('warn', logLevels.error)
    shouldLog('warn', logLevels.warn)
    shouldLog('warn', logLevels.info)
    shouldLog('warn', logLevels.debug)
    shouldNotLogWithLocalLevelOverride('warn', logLevels.none)
    shouldNotLogWithLocalLevelOverride('warn', logLevels.error)
    shouldLogWithLocalLevelOverride('warn', logLevels.warn)
    shouldLogWithLocalLevelOverride('warn', logLevels.info)
    shouldLogWithLocalLevelOverride('warn', logLevels.debug)

    shouldNotLog('info', logLevels.none)
    shouldNotLog('info', logLevels.error)
    shouldNotLog('info', logLevels.warn)
    shouldLog('info', logLevels.info)
    shouldLog('info', logLevels.debug)
    shouldNotLogWithLocalLevelOverride('info', logLevels.none)
    shouldNotLogWithLocalLevelOverride('info', logLevels.error)
    shouldNotLogWithLocalLevelOverride('info', logLevels.warn)
    shouldLogWithLocalLevelOverride('info', logLevels.info)
    shouldLogWithLocalLevelOverride('info', logLevels.debug)

    shouldNotLog('debug', logLevels.none)
    shouldNotLog('debug', logLevels.error)
    shouldNotLog('debug', logLevels.warn)
    shouldNotLog('debug', logLevels.info)
    shouldLog('debug', logLevels.debug)
    shouldNotLogWithLocalLevelOverride('debug', logLevels.none)
    shouldNotLogWithLocalLevelOverride('debug', logLevels.error)
    shouldNotLogWithLocalLevelOverride('debug', logLevels.warn)
    shouldNotLogWithLocalLevelOverride('debug', logLevels.info)
    shouldLogWithLocalLevelOverride('debug', logLevels.debug)

    shouldNotCallLogFunction(logLevels.error, logLevels.none)
    shouldCallLogFunction(logLevels.error, logLevels.error)
    shouldCallLogFunction(logLevels.error, logLevels.warn)
    shouldCallLogFunction(logLevels.error, logLevels.info)
    shouldCallLogFunction(logLevels.error, logLevels.debug)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.error, logLevels.none)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.error, logLevels.error)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.error, logLevels.warn)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.error, logLevels.info)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.error, logLevels.debug)

    shouldNotCallLogFunction(logLevels.warn, logLevels.none)
    shouldNotCallLogFunction(logLevels.warn, logLevels.error)
    shouldCallLogFunction(logLevels.warn, logLevels.warn)
    shouldCallLogFunction(logLevels.warn, logLevels.info)
    shouldCallLogFunction(logLevels.warn, logLevels.debug)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.warn, logLevels.none)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.warn, logLevels.error)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.warn, logLevels.warn)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.warn, logLevels.info)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.warn, logLevels.debug)

    shouldNotCallLogFunction(logLevels.info, logLevels.none)
    shouldNotCallLogFunction(logLevels.info, logLevels.error)
    shouldNotCallLogFunction(logLevels.info, logLevels.warn)
    shouldCallLogFunction(logLevels.info, logLevels.info)
    shouldCallLogFunction(logLevels.info, logLevels.debug)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.info, logLevels.none)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.info, logLevels.error)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.info, logLevels.warn)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.info, logLevels.info)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.info, logLevels.debug)

    shouldNotCallLogFunction(logLevels.debug, logLevels.none)
    shouldNotCallLogFunction(logLevels.debug, logLevels.error)
    shouldNotCallLogFunction(logLevels.debug, logLevels.warn)
    shouldNotCallLogFunction(logLevels.debug, logLevels.info)
    shouldCallLogFunction(logLevels.debug, logLevels.debug)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.debug, logLevels.none)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.debug, logLevels.error)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.debug, logLevels.warn)
    shouldNotCallLogFunctionWithLocalLevelOverride(logLevels.debug, logLevels.info)
    shouldCallLogFunctionWithLocalLevelOverride(logLevels.debug, logLevels.debug)
  })

  test.skip('on() log using log argument', () => {
    store.value.mode = 'test'
    store.value.logLevel = logLevels.debug
    const logger = getLogger('log on fn')

    logger.on('error', log => { log('value') })

    a.satisfies(capture.logs, [
      { id: 'log on fn', level: logLevels.error, args: ['value'] }
    ])
  })

  test.skip('write entry directly', () => {
    const log = getLogger('write-entry')
    const entry = { id: 'write-entry', level: logLevels.info, args: ['abc'], timestamp: new Date() }
    log.write(entry)
    a.satisfies(capture.logs, [entry])
  })
})

test.skip('on() can take log level name in first argument', () => {
  const log = getLogger('string-on')
  log.on('debug', () => { return })
})

test.skip('auto configure', async () => {
  expect(store.value.configured).toBeFalsy()
  const log = getLogger('auto config')

  log.info('config is called automatically as expected')

  await delay(10)
  expect(store.value.configured).toBeTruthy()
})

describe.skip('writeTo', () => {
  let memReporter: MemoryLogReporter
  let specialReporter: MemoryLogReporter
  beforeEach(() => {
    memReporter = createMemoryLogReporter()
    specialReporter = createMemoryLogReporter({ id: 'special' })
    config({ mode: 'test', reporters: [memReporter, specialReporter] })
  })
  test.skip('specific reporter with string', () => {
    const log = getLogger('writeTo-string', { writeTo: 'special' })
    log.error('error message')

    expect(memReporter.logs.length).toEqual(0)
    expect(specialReporter.logs.length).toEqual(1)
  })

  test.skip('specific reporter with regex', () => {
    const log = getLogger('writeTo-regex', { writeTo: /^spec/ })
    log.error('error message')

    expect(memReporter.logs.length).toEqual(0)
    expect(specialReporter.logs.length).toEqual(1)
  })

  test.skip('specific reporter with RegExp', () => {
    const log = getLogger('writeTo-RegExp', { writeTo: new RegExp('^spec') })
    log.error('error message')

    expect(memReporter.logs.length).toEqual(0)
    expect(specialReporter.logs.length).toEqual(1)
  })

  test.skip('specific reporter with function', () => {
    const log = getLogger('writeTo-fn', { writeTo: id => id === 'special' })
    log.error('error message')

    expect(memReporter.logs.length).toEqual(0)
    expect(specialReporter.logs.length).toEqual(1)
  })

  test.skip('custom reporter', () => {
    const reporter = createMemoryLogReporter({ id: 'custom mem' })
    const log = getLogger('writeTo-reporter', { writeTo: reporter })
    log.error('error message')

    expect(reporter.logs.length).toEqual(1)
  })

  test.skip('custom reporter cannot override added console reporter', () => {
    // if not, it would be a security issue as the new reporter
    // can capture the logs from other logger and send it elsewhere
    const reporter = createMemoryLogReporter({ id: 'custom mem' })
    reporter.isConsoleReporter = true
    getLogger('writeTo-reporter-no-override', { writeTo: reporter })
    const log = getLogger('writeTo-reporter-no-override-2')
    log.error('error message')

    expect(reporter.logs.length).toEqual(0)
  })
})

test.skip('id is readonly', () => {
  const log: any = getLogger('id is readonly')
  a.throws(() => log.id = 'b')
})

test.skip.each(['on', 'count', 'error', 'warn', 'info', 'debug'])('method %s is readonly', name => {
  const log: any = getLogger(`${name} is readonly`)

  a.throws(() => log[name] = true)
})

