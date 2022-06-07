import a from 'assertron'
import {
  config, createMemoryLogReporter,
  logLevels, ProhibitedDuringProduction, toLogLevelName
} from './index.js'
import { configForTest } from './configForTest.js'
import { store } from './store.js'
import { assertSSF } from './testUtil.js'

beforeEach(() => store.reset())

afterEach(() => store.reset())

test('in production mode by default', () => {
  expect(store.value.mode).toBe('production')
})

test('default logLevel is info', () => {
  expect(store.value.logLevel).toBe(logLevels.info)
})

test('configure default logLevel', () => {
  config({ logLevel: logLevels.planck })

  expect(store.value.logLevel).toBe(logLevels.planck)
})

test('calling config twice throws ProhibitedDuringProduction in production mode', () => {
  config({ mode: 'production' })
  a.throws(() => config({ mode: 'development' }), ProhibitedDuringProduction)
})

it('throw ProhibitedDuringProduction with ssf to the call site', () => {
  config({ mode: 'production' })
  const err = a.throws(() => config({ mode: 'development' }), ProhibitedDuringProduction)

  assertSSF(err, __filename)
})

test('allow calling config with non-test mode while already running in test mode, but emit a warning', () => {
  const { reporter } = configForTest()
  config({ mode: 'production' })
  expect(reporter.getLogMessageWithLevel()).toEqual('(WARN) already configured for test, ignoring config() call')
})

test('allow calling config in test mode again while in test mode. Emit no warning', () => {
  const { reporter } = configForTest()
  config({ mode: 'test' })
  expect(reporter.getLogMessageWithLevel()).toEqual('')
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

test('configure as development will emit warning', () => {
  const warn = console.warn
  let actual: string
  console.warn = message => actual = message
  config({ mode: 'development' })

  expect(actual!).toBe(`'standard-log' is running in 'development' mode. Configuration is not protected.`)

  console.warn = warn
})

test('config.configured', () => {
    expect(config.isLocked).toBeFalsy()
  config({ mode: 'test' })
  expect(config.isLocked).toBe(true)
})
