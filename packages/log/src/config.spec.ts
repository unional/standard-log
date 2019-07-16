import a from 'assertron';
import { clearCustomLogLevel, clearLogReporters, config, logLevel, ProhibitedDuringProduction, toLogLevelName } from '.';
import { resetStore, store } from './store';
import { createMemoryLogReporter } from './test-util';

afterEach(() => {
  clearCustomLogLevel()
  resetStore()
})

test('in production mode by default', () => {
  expect(store.get().mode).toBe('prod')
})

test('configure default logLevel', () => {
  config({
    logLevel: logLevel.planck
  })

  expect(store.get().logLevel).toBe(logLevel.planck)
})

test('calling config twice emits a warning during development mode', () => {
  const warn = console.warn.bind(console)
  try {
    let actual: any[] = []
    console.warn = (...args: any[]) => actual = args

    config({ mode: 'devel' })
    config({ mode: 'devel' })
    expect(actual).toEqual(['standard-log has been configured before. Overriding. `config()` should only be called once by the application'])
  }
  finally {
    console.warn = warn
  }
})

test('calling config twice thros ProhibitedDuringProduction in production mode', () => {
  config({ mode: 'prod' })
  a.throws(() => config({ mode: 'devel' }), ProhibitedDuringProduction)
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
  clearLogReporters()

  config({
    reporters: [
      createMemoryLogReporter()
    ]
  })
  a.satisfies(store.get().reporters, [{ id: 'memory' }])
  expect(store.get().reporters.length).toBe(1)
})
