import { createStandardLog } from '../createStandardLog.js'
import {
  ConsoleLogFormatter, createConsoleLogReporter,
  LogFilter, logLevels, plainLogFormatter
} from '../index.js'

describe('unit tests', () => {
  describe('rendering tests', () => {
    test('plain rendering', () => {
      const reporter = createConsoleLogReporter({ formatter: plainLogFormatter });
      ['emergency', 'info', 'warn', 'debug'].forEach(level => {
        reporter.write({ id: 'plain', level: (logLevels as any)[level], args: ['hello', 'world'], timestamp: new Date() })
      })
    })
  })

  describe('id', () => {
    test('default is "console"', () => {
      const reporter = createConsoleLogReporter()
      expect(reporter.id).toBe('console')
    })
    test('can be overridden', () => {
      const reporter = createConsoleLogReporter({ id: 'neo-console' })
      expect(reporter.id).toBe('neo-console')
    })
  })

  describe('log level', () => {
    test('error, alert, critical and emergency logs are written to console.error', () => {
      const id = 'log'
      const reporter = createConsoleLogReporter()
      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id, level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.critical, args: ['critical'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.alert, args: ['alert'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.error, args: ['error'], timestamp: new Date() })

      expect(fakeConsole.errors.length).toBe(4)
    })

    test('warn logs are written to console.warn', () => {
      const id = 'log'
      const reporter = createConsoleLogReporter()

      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id, level: logLevels.warn, args: ['warn'], timestamp: new Date() })

      expect(fakeConsole.warns.length).toBe(1)
    })

    test('notice and info logs are written to console.info', () => {
      const id = 'log'
      const reporter = createConsoleLogReporter()

      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id, level: logLevels.notice, args: ['notice'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.info, args: ['info'], timestamp: new Date() })

      expect(fakeConsole.infos.length).toBe(2)
    })


    test('debug, trace, and planck logs are written to console.debug', () => {
      const id = 'log'
      const reporter = createConsoleLogReporter()
      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id, level: logLevels.debug, args: ['debug'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.trace, args: ['trace'], timestamp: new Date() })
      reporter.write({ id, level: logLevels.planck, args: ['planck'], timestamp: new Date() })

      expect(fakeConsole.debugs.length).toBe(3)
    })
  })

  describe('custom logs', () => {
    test('are written according to their log level value', () => {
      const id = 'log'
      const reporter = createConsoleLogReporter()
      const fakeConsole = reporter.console = createFakeConsole()

      const sl = createStandardLog({
        logLevel: logLevels.all,
        customLevels: {
          'high': 50,
          'important': 450,
          'interest': 650,
          'silly': 1000
        },
        reporters: [reporter]
      })
      const log = sl.getLogger([id])
      log.high('a')
      log.important('b')
      log.interest('c')
      log.silly('d')

      expect(fakeConsole.errors.length).toBe(1)
      expect(fakeConsole.warns.length).toBe(1)
      expect(fakeConsole.infos.length).toBe(1)
      expect(fakeConsole.debugs.length).toBe(1)
    })
  })

  const idFormatter: ConsoleLogFormatter = (entry) => [entry.id]

  describe('formatter', () => {
    test('use specific formatter', () => {
      const id = 'id-only'
      const reporter = createConsoleLogReporter({ formatter: idFormatter })
      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id, level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })

      expect(fakeConsole.errors).toEqual([['id-only']])
    })
  })

  describe('filter', () => {
    const filter: LogFilter = (entry) => entry.id !== 'secret'
    test('use specific filter', () => {
      const reporter = createConsoleLogReporter({ formatter: idFormatter, filter })
      const fakeConsole = reporter.console = createFakeConsole()

      reporter.write({ id: 'normal', level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })
      reporter.write({ id: 'secret', level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })

      expect(fakeConsole.errors).toEqual([['normal']])
    })
  })

  test('write log entry with multiple arguments', () => {
    const id = 'log'
    const reporter = createConsoleLogReporter({ formatter: plainLogFormatter })
    const fakeConsole = reporter.console = createFakeConsole()

    const entry = { id, level: logLevels.info, args: ['a', 'b', 'c'], timestamp: new Date() }

    reporter.write(entry)

    expect(fakeConsole.infos).toEqual([
      [entry.timestamp.toISOString(), 'log', '(INFO)', 'a', 'b', 'c']
    ])
  })
})


function createFakeConsole() {
  const errors: any[] = []
  const infos: any[] = []
  const warns: any[] = []
  const debugs: any[] = []
  return {
    errors,
    infos,
    warns,
    debugs,
    error(...args: any[]) { errors.push(args) },
    info(...args: any[]) { infos.push(args) },
    warn(...args: any[]) { warns.push(args) },
    debug(...args: any[]) { debugs.push(args) }
  }
}
