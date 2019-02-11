import { addCustomLogLevel, clearCustomLogLevel, logLevel } from 'standard-log-core';
import { createConsoleLogWriter } from './createConsoleLogWriter';

test('error, alert, critical and emergency logs are written to console.error', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogWriter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write(logger, logLevel.emergency, ['emergency'])
  writer.write(logger, logLevel.critical, ['critical'])
  writer.write(logger, logLevel.alert, ['alert'])
  writer.write(logger, logLevel.error, ['error'])

  expect(fakeConsole.errors).toEqual([
    ['log', '(EMERGENCY)', 'emergency'],
    ['log', '(CRITICAL)', 'critical'],
    ['log', '(ALERT)', 'alert'],
    ['log', '(ERROR)', 'error']
  ])
})

test('warn logs are written to console.warn', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogWriter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write(logger, logLevel.warn, ['warn'])

  expect(fakeConsole.warns).toEqual([
    ['log', '(WARN)', 'warn']
  ])
})

test('notice and info logs are written to console.info', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogWriter()

  const fakeConsole = createFakeConsole();

  (writer as any).console = fakeConsole

  writer.write(logger, logLevel.notice, ['notice'])
  writer.write(logger, logLevel.info, ['info'])

  expect(fakeConsole.infos).toEqual([
    ['log', '(NOTICE)', 'notice'],
    ['log', '(INFO)', 'info']
  ])
})


test('debug and trace logs are written to console.debug', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogWriter()
  const fakeConsole = createFakeConsole();
  (writer as any).console = fakeConsole

  writer.write(logger, logLevel.debug, ['debug'])
  writer.write(logger, logLevel.trace, ['trace'])

  expect(fakeConsole.debugs).toEqual([
    ['log', '(DEBUG)', 'debug'],
    ['log', '(TRACE)', 'trace']
  ])
})

describe('custom logs', () => {
  afterEach(() => clearCustomLogLevel())

  test('are written according to their log level value', () => {
    addCustomLogLevel('high', 5)
    addCustomLogLevel('important', 45)
    addCustomLogLevel('interest', 65)
    addCustomLogLevel('silly', 100)

    const logger = { id: 'log' }
    const writer = createConsoleLogWriter()
    const fakeConsole = createFakeConsole();
    (writer as any).console = fakeConsole

    writer.write(logger, 5, ['a'])
    writer.write(logger, 45, ['b'])
    writer.write(logger, 65, ['c'])
    writer.write(logger, 100, ['d'])

    const { errors, warns, infos, debugs } = fakeConsole
    expect({ errors, warns, infos, debugs }).toEqual({
      errors: [['log', '(HIGH)', 'a']],
      warns: [['log', '(IMPORTANT)', 'b']],
      infos: [['log', '(INTEREST)', 'c']],
      debugs: [['log', '(SILLY)', 'd']]
    })
  })
})

test('write multiple messages', () => {
  const logger = { id: 'log' }
  const writer = createConsoleLogWriter()
  const fakeConsole = createFakeConsole();
  (writer as any).console = fakeConsole

  writer.write(logger, logLevel.info, ['a', 'b', 'c'])

  expect(fakeConsole.infos).toEqual([
    ['log', '(INFO)', 'a', 'b', 'c']
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
