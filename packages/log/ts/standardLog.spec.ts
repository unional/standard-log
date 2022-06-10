import { assertron as a } from 'assertron'
import { InvalidId } from './errors.js'
import { logLevels } from './logLevels.js'
import { toLogLevelName } from './logStore.js'
import { createMemoryLogReporter } from './memory.js'
import { createStandardLog, createStandardLogForTest, StandLog, suppressLogs } from './standardLog.js'
import { assertSSF, wrapTest } from './testUtil.js'
import { LogEntry, Logger, LoggerOptions, LogMethodNames } from './types.js'

describe('createStandardLog()', () => {
  describe('logLevel', () => {
    it('is default to info', () => {
      const actual = createStandardLog()
      expect(actual.logLevel).toBe(logLevels.info)
    })
    it('is readonly', () => {
      const actual = createStandardLog()
      a.throws(() => (actual as any).logLevel = logLevels.planck, err => /only a getter/.test(err))
    })
    it('set logLevel from options', () => {
      const actual = createStandardLog({ logLevel: logLevels.planck })
      expect(actual.logLevel).toBe(logLevels.planck)
    })
  })

  describe('custom levels', () => {
    it('can define custom levels', () => {
      const actual = createStandardLog({ customLevels: { urgent: 80 } })

      expect(actual.toLogLevelName(80)).toBe('urgent')
    })
  })

  describe('reporters', () => {
    it('can specify reporter', () => {
      const mem = createMemoryLogReporter()
      const sl = createStandardLog({ reporters: [mem] })
      const log = sl.getLogger(['x'])
      log.info('abc')
      expect(mem.logs.length).toBe(1)
    })
  })
})

describe('createStandardLogForTest()', () => {
  it('returns with memory reporter', () => {
    const { reporter } = createStandardLogForTest()
    expect(reporter.getLogMessageWithLevel()).toBe('')
  })

  it('defaults to debug', () => {
    const store = createStandardLogForTest()
    expect(store.logLevel).toBe(logLevels.debug)
  })
})

describe('getLogger()', () => {
  it('supports id with alphanumeric and :_-.', () => {
    const sl = createStandardLog()
    sl.getLogger(['abcdefghijklmnopqrstuvwxyz:-_.1234567890'])
  })
  it('supports id with unicode', () => {
    const sl = createStandardLog()
    sl.getLogger(['ミク香港'])
  })
  it('supports id with @, \\ and /', () => {
    const sl = createStandardLog()
    sl.getLogger(['@unional/fixture'])
    sl.getLogger([`a\\b\\c`])
  })
  it.each('`~!#$%^&*()=+|[]{}<>,?'.split(''))('throws if id has unsupported character %s', (char: string) => {
    const sl = createStandardLog()
    a.throws(() => sl.getLogger([char]), InvalidId)
  })
  it('throw InvalidId with ssf to the call site', () => {
    const sl = createStandardLog()
    const err = a.throws(() => sl.getLogger(['!']), InvalidId)

    assertSSF(err, __filename)
  })
  test('id is readonly', () => {
    const sl = createStandardLog()
    const log: any = sl.getLogger(['id is readonly'])
    a.throws(() => log.id = 'b')
  })

  test('get logger with same name gets the same instance', () => {
    const sl = createStandardLog()
    const expected = sl.getLogger(['same-inst'])
    const actual = sl.getLogger(['same-inst'])
    expect(actual).toBe(expected)
  })

  it('can specify local log level', () => {
    const sl = createStandardLog()
    const log = sl.getLogger(['local', { level: logLevels.trace }])
    expect(log.level).toBe(logLevels.trace)
  })

  test('new logger will get custom level', () => {
    const sl = createStandardLog({ customLevels: { 'to_logger': 1234 } })
    const actual = sl.getLogger(['to_logger_logger'])
    expect(typeof actual.to_logger).toBe('function')
  })

  describe('log levels', () => {
    async function assertLoggedAtLevel(sl: ReturnType<typeof createStandardLogForTest>, method: LogMethodNames, level: number) {
      const log = sl.getLogger([method])
      const msg = `should log on level: ${level}`;
      (log as any)[method](msg)
      a.satisfies(sl.reporter.logs, [{ id: method, level: sl.toLogLevel(method), args: [msg] }])
    }

    async function assertNotLoggedAtLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, level: number) {
      const log = sl.getLogger([method]);
      (log as any)[method](`should not log on level: ${level}`)
      expect(sl.reporter.logs.length).toBe(0)
    }

    async function assertLoggedAtLocalLevel(sl: ReturnType<typeof createStandardLogForTest>, method: LogMethodNames, localLevel: number) {
      const log = sl.getLogger([method, { level: localLevel }])

      const msg = `should log on level: ${localLevel}`;
      (log as any)[method](msg)
      a.satisfies(sl.reporter.logs, [{ id: log.id, level: sl.toLogLevel(method), args: [msg] }])
    }

    async function assertNotLoggedAtLocalLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, localLevel: number) {
      const log = sl.getLogger([method, { level: localLevel }]);
      (log as any)[method](`should not log on level: ${localLevel}`)
      expect(sl.reporter.logs.length).toBe(0)
    }

    async function assertLoggedAtCallLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, callLevel: number) {
      const log = sl.getLogger([method])
      let actual = false
      log.on(callLevel, () => actual = true)
      expect(actual).toBe(true)
    }

    async function assertNotLoggedAtCallLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, callLevel: number, actualLevel: number) {
      const log = sl.getLogger([method])
      log.on(callLevel, () => { throw new Error(`should not log at level ${actualLevel}`) })
    }

    async function assertLoggedAtCallLevelOverrideLocalLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, localLevel: number, callLevel: number) {
      const log = sl.getLogger([method, { level: localLevel }])
      let actual = false
      log.on(callLevel, () => actual = true)
      expect(actual).toBe(true)
    }

    async function assertNotLoggedAtCallLevelOverrideLocalLevel(sl: ReturnType<typeof createStandardLogForTest>, method: string, localLevel: number, callLevel: number) {
      const log = sl.getLogger([method, { level: localLevel }])
      log.on(callLevel, () => { throw new Error(`should not log at level ${localLevel}`) })
    }

    const shouldLog = wrapTest((test) => (method: LogMethodNames, level: number) => {
      const sl = createStandardLogForTest(level)
      const name = sl.toLogLevelName(level)
      test(`${method}() should log on level: ${name} (${level})`, () => {
        return assertLoggedAtLevel(sl, method, level)
      })
    })
    const shouldNotLog = wrapTest((test) => (method: string, level: number) => {
      const sl = createStandardLogForTest(level)
      const name = sl.toLogLevelName(level)
      test(`${method}() should not log on level: ${name} (${level})`, () => {
        return assertNotLoggedAtLevel(sl, method, level)
      })
    })

    const shouldLogWithLocalLevelOverride = wrapTest((test) => (method: LogMethodNames, localLevel: number) => {
      const localName = toLogLevelName(localLevel);
      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const sl = createStandardLogForTest(globalLevel)
          return assertLoggedAtLocalLevel(sl, method, localLevel)
        })
      })
    })

    const shouldNotLogWithLocalLevelOverride = wrapTest((test) => (method: string, localLevel: number) => {
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const sl = createStandardLogForTest(globalLevel)
          return assertNotLoggedAtLocalLevel(sl, method, localLevel)
        })
      })
    })

    const shouldCallLogFunction = wrapTest((test) => (callLevel: number, actualLevel: number) => {
      const method = toLogLevelName(callLevel)
      const name = toLogLevelName(actualLevel)
      test(`${method}() should call log function on level: ${name} (${actualLevel})`, () => {
        const sl = createStandardLogForTest(actualLevel)
        return assertLoggedAtCallLevel(sl, method, callLevel)
      })
    })

    const shouldNotCallLogFunction = wrapTest((test) => (callLevel: number, actualLevel: number) => {
      const method = toLogLevelName(callLevel)
      const name = toLogLevelName(actualLevel)
      test(`${method}() should not call log function on level: ${name} (${actualLevel})`, () => {
        const sl = createStandardLogForTest(actualLevel)
        return assertNotLoggedAtCallLevel(sl, method, callLevel, actualLevel)
      })
    })

    const shouldCallLogFunctionWithLocalLevelOverride = wrapTest((test) => (callLevel: number, localLevel: number) => {
      const method = toLogLevelName(callLevel)
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const sl = createStandardLogForTest(globalLevel)
          return assertLoggedAtCallLevelOverrideLocalLevel(sl, method, localLevel, callLevel)
        })
      })
    })

    const shouldNotCallLogFunctionWithLocalLevelOverride = wrapTest((test) => (callLevel: number, localLevel: number) => {
      const method = toLogLevelName(callLevel)
      const localName = toLogLevelName(localLevel);

      [logLevels.none, logLevels.error, logLevels.warn, logLevels.info, logLevels.debug].forEach(globalLevel => {
        const globalName = toLogLevelName(globalLevel) || 'none'
        test(`${method}() should not log on local level: ${localName} (${localLevel}) while global level: ${globalName} (${globalLevel})`, () => {
          const sl = createStandardLogForTest(globalLevel)
          return assertNotLoggedAtCallLevelOverrideLocalLevel(sl, method, localLevel, callLevel)
        })
      })
    })

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

  it('writes entry directly', () => {
    const sl = createStandardLogForTest()
    const log = sl.getLogger(['write-entry'])
    const entry = { id: 'write-entry', level: logLevels.info, args: ['abc'], timestamp: new Date() }
    log.write(entry)
    a.satisfies(sl.reporter.logs, [entry])
  })
  test.each(['on', 'count', 'error', 'warn', 'info', 'debug'])('method %s is readonly', name => {
    const sl = createStandardLog()
    const log: any = sl.getLogger([`${name} is readonly`])

    a.throws(() => log[name] = true)
  })


  describe('on()', () => {
    it('log using log argument', () => {
      const sl = createStandardLogForTest()
      const logger = sl.getLogger(['log on fn'])
      logger.on('error', log => { log('value') })

      a.satisfies(sl.reporter.logs, [
        { id: 'log on fn', level: logLevels.error, args: ['value'] }
      ])
    })
    it('can take log level name in first argument', () => {
      const sl = createStandardLogForTest()
      const log = sl.getLogger(['string-on'])
      log.on('debug', () => { return })
    })
  })
  describe('count()', () => {
    test('will increment the counter', async () => {
      const sl = createStandardLogForTest()
      const logger = sl.getLogger(['inc counter'])

      logger.count()
      logger.count()

      a.satisfies(sl.reporter.logs, [
        { id: 'inc counter', level: logLevels.debug, args: [1] },
        { id: 'inc counter', level: logLevels.debug, args: [2] }
      ])
    })

    test('append args after the counter', async () => {
      const sl = createStandardLogForTest(logLevels.debug)
      const id = 'inc with args'
      const logger = sl.getLogger([id])
      logger.count('msg1', 'msg2')

      a.satisfies(sl.reporter.logs, [
        { id, level: logLevels.debug, args: [1, 'msg1', 'msg2'] }
      ])
    })

    test('not log if log level is less than debug', async () => {
      const sl = createStandardLogForTest(logLevels.debug - 1)
      const id = 'inc with args'
      const logger = sl.getLogger([id])
      logger.count('msg1', 'msg2')

      expect(sl.reporter.logs.length).toBe(0)
    })
  })

  test('logger with custom level', async () => {
    const mem = createMemoryLogReporter()
    const sl = createStandardLog({ customLevels: { 'cust_lvl': 100 }, reporters: [mem] })
    const logger = sl.getLogger(['cust'])
    logger.cust_lvl('a', 'b')

    a.satisfies(mem.logs, [{ id: 'cust', level: 100, args: ['a', 'b'] }])
  })

  describe('getLogger([,{ writeTo }])', () => {
    function testWriteTo(
      loggerParams: [id: string, options: LoggerOptions],
      handler: (log: Logger, memLogs: LogEntry[], specialLogs: LogEntry[], sl: StandLog) => void
    ) {
      const memReporter = createMemoryLogReporter()
      const specialReporter = createMemoryLogReporter({ id: 'special' })
      const sl = createStandardLog({ reporters: [memReporter, specialReporter] })

      const log = sl.getLogger(loggerParams)
      handler(log, memReporter.logs, specialReporter.logs, sl)
    }
    it('can specify which reporter to use by name', () => {
      testWriteTo(['writeTo-string', { writeTo: 'special' }], (log, memLogs, specialLogs) => {
        log.error('error message')
        expect(memLogs.length).toEqual(0)
        expect(specialLogs.length).toEqual(1)
      })
    })
    it('can specify which reporter to use by regex', () => {
      testWriteTo(['writeTo-regex', { writeTo: /^spec/ }], (log, memLogs, specialLogs) => {
        log.error('error message')
        expect(memLogs.length).toEqual(0)
        expect(specialLogs.length).toEqual(1)
      })
    })
    it('can specify which reporter to use by RegExp', () => {
      testWriteTo(['writeTo-RegExp', { writeTo: new RegExp('^spec') }], (log, memLogs, specialLogs) => {
        log.error('error message')
        expect(memLogs.length).toEqual(0)
        expect(specialLogs.length).toEqual(1)
      })
    })
    it('can specify which reporter to use by function', () => {
      testWriteTo(['writeTo-fn', { writeTo: id => id === 'special' }],
        (log, memLogs, specialLogs) => {
          log.error('error message')
          expect(memLogs.length).toEqual(0)
          expect(specialLogs.length).toEqual(1)
        })
    })
    it('can specify custom reporter', () => {
      const reporter = createMemoryLogReporter({ id: 'custom mem' })
      testWriteTo(['writeTo-reporter', { writeTo: reporter }],
        (log, memLogs, specialLogs) => {
          log.error('error message')
          expect(memLogs.length).toEqual(0)
          expect(specialLogs.length).toEqual(0)
          expect(reporter.logs.length).toEqual(1)
        })
    })

    test('the custom console reporter cannot pick up logs from other loggers', () => {
      // if not, it would be a security issue as the new reporter
      // can capture the logs from other logger and send it elsewhere
      const reporter = createMemoryLogReporter({ id: 'custom mem' });
      (reporter as any).isConsoleReporter = true
      testWriteTo(['writeTo-reporter-no-override', { writeTo: reporter }],
        (_, memLogs, specialLogs, sl) => {
          const log = sl.getLogger(['writeTo-reporter-no-override-2'])
          log.error('error message')

          expect(reporter.logs.length).toEqual(0)
        })
    })
  })
})

describe('suppressLogs()', () => {
  test('suppress log', () => {
    const sl = createStandardLogForTest()
    const log = sl.getLogger(['l'])
    suppressLogs(() => {
      log.alert('should not see me')
    }, log)

    expect(sl.reporter.getLogMessageWithLevel()).toBe('')
  })

  test('suppress multiple logs', () => {
    const sl = createStandardLogForTest()
    const log1 = sl.getLogger(['l1'])
    const log2 = sl.getLogger(['l2'])
    suppressLogs(() => {
      log1.alert('should not see me')
      log2.alert('should not see me too')
    }, log1, log2)
    expect(sl.reporter.getLogMessageWithLevel()).toBe('')
  })

  test('return block result', () => {
    const sl = createStandardLogForTest()
    const log1 = sl.getLogger(['l'])
    const log2 = sl.getLogger(['l2'])
    const a = suppressLogs(() => 1, log1, log2)
    expect(a).toBe(1)
  })
})
