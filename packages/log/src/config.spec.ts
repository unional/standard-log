import a from 'assertron';
import { config, createMemoryLogReporter, logLevels, ProhibitedDuringProduction, toLogLevelName } from '.';
import { store } from './store';

beforeEach(() => store.reset())

afterEach(() => store.reset())

test('in production mode by default', () => {
  expect(store.value.mode).toBe('production')
})

test('configure default logLevel', () => {
  config({
    logLevel: logLevels.planck
  })

  expect(store.value.logLevel).toBe(logLevels.planck)
})

test('calling config twice throws ProhibitedDuringProduction in production mode', () => {
  config({ mode: 'production' })
  a.throws(() => config({ mode: 'development' }), ProhibitedDuringProduction)
})

test('add custom levels', () => {
  config({
    customLevels: {
      'urgent': 80
    }
  })

  expect(toLogLevelName(80)).toBe('urgent')
})

test('configure to use a reporter instance', () => {
  config({
    reporters: [
      createMemoryLogReporter()
    ]
  })
  a.satisfies(store.value.reporters, [{ id: 'memory' }])
  expect(store.value.reporters.length).toBe(1)
})

test('configure as devel will emit warning', () => {
  const warn = console.warn
  let actual: string
  console.warn = message => actual = message
  config({ mode: 'development' })

  expect(actual!).toBe(`'standard-log' is configured in 'development' mode. Configuration is not protected.`)

  console.warn = warn
})

test('config.configured', () => {
  expect(config.isLocked).toBeFalsy()
  config({ mode: 'test' })
  expect(config.isLocked).toBe(true)
})
