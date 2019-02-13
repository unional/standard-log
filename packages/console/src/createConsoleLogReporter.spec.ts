import { addCustomLogLevel, clearCustomLogLevel, logLevel } from 'standard-log-core';
import { createConsoleLogReporter } from './createConsoleLogReporter';

test('error, alert, critical and emergency logs are written to console.error', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogReporter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write({ loggerId: logger.id, level: logLevel.emergency, messages: ['emergency'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.critical, messages: ['critical'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.alert, messages: ['alert'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.error, messages: ['error'], timestamp: new Date() })

  expect(fakeConsole.errors.length).toBe(4)
})

test('warn logs are written to console.warn', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogReporter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write({ loggerId: logger.id, level: logLevel.warn, messages: ['warn'], timestamp: new Date() })

  expect(fakeConsole.warns.length).toBe(1)
})

test('notice and info logs are written to console.info', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogReporter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write({ loggerId: logger.id, level: logLevel.notice, messages: ['notice'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.info, messages: ['info'], timestamp: new Date() })

  expect(fakeConsole.infos.length).toBe(2)
})


test('debug, trace, and planck logs are written to console.debug', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogReporter()
  const fakeConsole = createFakeConsole();
  (writer as any).console = fakeConsole

  writer.write({ loggerId: logger.id, level: logLevel.debug, messages: ['debug'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.trace, messages: ['trace'], timestamp: new Date() })
  writer.write({ loggerId: logger.id, level: logLevel.planck, messages: ['planck'], timestamp: new Date() })

  expect(fakeConsole.debugs.length).toBe(3)
})

describe('custom logs', () => {
  afterEach(() => clearCustomLogLevel())

  test('are written according to their log level value', () => {
    addCustomLogLevel('high', 50)
    addCustomLogLevel('important', 450)
    addCustomLogLevel('interest', 650)
    addCustomLogLevel('silly', 1000)

    const logger = { id: 'log' }
    const writer = createConsoleLogReporter()
    const fakeConsole = createFakeConsole();
    (writer as any).console = fakeConsole

    writer.write({ loggerId: logger.id, level: 50, messages: ['a'], timestamp: new Date() })
    writer.write({ loggerId: logger.id, level: 450, messages: ['b'], timestamp: new Date() })
    writer.write({ loggerId: logger.id, level: 650, messages: ['c'], timestamp: new Date() })
    writer.write({ loggerId: logger.id, level: 1000, messages: ['d'], timestamp: new Date() })

    expect(fakeConsole.errors.length).toBe(1)
    expect(fakeConsole.warns.length).toBe(1)
    expect(fakeConsole.infos.length).toBe(1)
    expect(fakeConsole.debugs.length).toBe(1)
  })
})

test('write multiple messages', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogReporter()
  const fakeConsole = createFakeConsole();
  (writer as any).console = fakeConsole

  const entry = { loggerId: logger.id, level: logLevel.info, messages: ['a', 'b', 'c'], timestamp: new Date() }

  writer.write(entry)

  expect(fakeConsole.infos).toEqual([
    ['log', '(INFO)', 'a', 'b', 'c', entry.timestamp]
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
