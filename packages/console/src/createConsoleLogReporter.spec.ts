import { addCustomLogLevel, clearCustomLogLevel, logLevel } from 'standard-log-core';
import { createConsoleLogReporter } from '.';
import { plainFormatter } from './plainFormatter';

test('default id is "console"', () => {
  const reporter = createConsoleLogReporter()

  expect(reporter.id).toBe('console')
})

test('default to color rendering', () => {
  const reporter = createConsoleLogReporter();
  ['emergency', 'info', 'warn', 'debug'].forEach(level => {
    reporter.write({ id: 'color', level: (logLevel as any)[level], args: ['hello', 'world'], timestamp: new Date() })
  })
})

test('plain rendering', () => {
  const reporter = createConsoleLogReporter({ formatter: plainFormatter });
  ['emergency', 'info', 'warn', 'debug'].forEach(level => {
    reporter.write({ id: 'plain', level: (logLevel as any)[level], args: ['hello', 'world'], timestamp: new Date() })
  })
})

test('error, alert, critical and emergency logs are written to console.error', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter()
  const fakeConsole = reporter.console = createFakeConsole();

  reporter.write({ id, level: logLevel.emergency, args: ['emergency'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.critical, args: ['critical'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.alert, args: ['alert'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.error, args: ['error'], timestamp: new Date() })

  expect(fakeConsole.errors.length).toBe(4)
})

test('warn logs are written to console.warn', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter()

  const fakeConsole = reporter.console = createFakeConsole();

  reporter.write({ id, level: logLevel.warn, args: ['warn'], timestamp: new Date() })

  expect(fakeConsole.warns.length).toBe(1)
})

test('notice and info logs are written to console.info', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter()

  const fakeConsole = reporter.console = createFakeConsole();

  reporter.write({ id, level: logLevel.notice, args: ['notice'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.info, args: ['info'], timestamp: new Date() })

  expect(fakeConsole.infos.length).toBe(2)
})


test('debug, trace, and planck logs are written to console.debug', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter()
  const fakeConsole = reporter.console = createFakeConsole();

  reporter.write({ id, level: logLevel.debug, args: ['debug'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.trace, args: ['trace'], timestamp: new Date() })
  reporter.write({ id, level: logLevel.planck, args: ['planck'], timestamp: new Date() })

  expect(fakeConsole.debugs.length).toBe(3)
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

test('write multiple messages', () => {
  const id = 'log'
  const reporter = createConsoleLogReporter({ formatter: plainFormatter })
  const fakeConsole = reporter.console = createFakeConsole();

  const entry = { id, level: logLevel.info, args: ['a', 'b', 'c'], timestamp: new Date() }

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
