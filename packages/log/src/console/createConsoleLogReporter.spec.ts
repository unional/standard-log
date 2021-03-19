import a from 'assertron';
import { addCustomLogLevel, clearCustomLogLevel, ConsoleLogFormatter, createConsoleLogReporter, LogFilter, logLevels, plainLogFormatter } from '..';
import { config } from '../config';
import { ProhibitedDuringProduction } from '../errors';
import { store } from '../store';

beforeEach(() => {
  store.reset()
  config({ mode: 'test' })
})

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
    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.critical, args: ['critical'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.alert, args: ['alert'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.error, args: ['error'], timestamp: new Date() })

    expect(fakeConsole.errors.length).toBe(4)
  })

  test('warn logs are written to console.warn', () => {
    const id = 'log'
    const reporter = createConsoleLogReporter()

    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: logLevels.warn, args: ['warn'], timestamp: new Date() })

    expect(fakeConsole.warns.length).toBe(1)
  })

  test('notice and info logs are written to console.info', () => {
    const id = 'log'
    const reporter = createConsoleLogReporter()

    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: logLevels.notice, args: ['notice'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.info, args: ['info'], timestamp: new Date() })

    expect(fakeConsole.infos.length).toBe(2)
  })


  test('debug, trace, and planck logs are written to console.debug', () => {
    const id = 'log'
    const reporter = createConsoleLogReporter()
    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: logLevels.debug, args: ['debug'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.trace, args: ['trace'], timestamp: new Date() })
    reporter.write({ id, level: logLevels.planck, args: ['planck'], timestamp: new Date() })

    expect(fakeConsole.debugs.length).toBe(3)
  })
})

describe('custom logs', () => {
  afterEach(() => clearCustomLogLevel())

  test('are written according to their log level value', () => {
    addCustomLogLevel('high', 50)
    addCustomLogLevel('important', 450)
    addCustomLogLevel('interest', 650)
    addCustomLogLevel('silly', 1000)

    const id = 'log'
    const reporter = createConsoleLogReporter()
    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: 50, args: ['a'], timestamp: new Date() })
    reporter.write({ id, level: 450, args: ['b'], timestamp: new Date() })
    reporter.write({ id, level: 650, args: ['c'], timestamp: new Date() })
    reporter.write({ id, level: 1000, args: ['d'], timestamp: new Date() })

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
    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id, level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })

    expect(fakeConsole.errors).toEqual([['id-only']])
  })

  test('formatter can be changed afterward', () => {
    const reporter = createConsoleLogReporter()
    const formatter = reporter.formatter
    reporter.formatter = idFormatter
    expect(reporter.formatter).not.toEqual(formatter)
  })

  test('set formatter during production mode throws', () => {
    config({ mode: 'production' })
    const reporter = createConsoleLogReporter()
    a.throws(() => reporter.formatter = idFormatter, ProhibitedDuringProduction)
  })
})

describe('filter', () => {
  const filter: LogFilter = (entry) => entry.id !== 'secret'
  test('use specific filter', () => {
    const reporter = createConsoleLogReporter({ formatter: idFormatter, filter })
    const fakeConsole = reporter.console = createFakeConsole();

    reporter.write({ id: 'normal', level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })
    reporter.write({ id: 'secret', level: logLevels.emergency, args: ['emergency'], timestamp: new Date() })

    expect(fakeConsole.errors).toEqual([['normal']])
  })

  test('can change filter', () => {
    const reporter = createConsoleLogReporter()
    const filter = reporter.filter
    reporter.filter = entry => entry.id !== 'secret'
    expect(reporter.filter).not.toEqual(filter)
  })

  test('set filter during production mode throws', () => {
    config({ mode: 'production' })
    const reporter = createConsoleLogReporter()
    a.throws(() => { reporter.filter = () => true }, ProhibitedDuringProduction)
  })
})

test('write log entry with multiple arguments', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter({ formatter: plainLogFormatter })
  const fakeConsole = reporter.console = createFakeConsole();

  const entry = { id, level: logLevels.info, args: ['a', 'b', 'c'], timestamp: new Date() }

  reporter.write(entry)

  expect(fakeConsole.infos).toEqual([
    [entry.timestamp.toISOString(), 'log', '(INFO)', 'a', 'b', 'c']
  ])
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
