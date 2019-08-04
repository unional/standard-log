import a from 'assertron';
import { config, createMemoryLogReporter, logLevel, ProhibitedDuringProduction, toLogLevelName } from '.';
import { store } from './store';

beforeEach(() => store.reset())

afterEach(() => store.reset())

test('in production mode by default', () => {
  expect(store.value.mode).toBe('prod')
})

test('configure default logLevel', () => {
  config({
    logLevel: logLevel.planck
  })

  expect(store.value.logLevel).toBe(logLevel.planck)
})

test('calling config twice throws ProhibitedDuringProduction in production mode', () => {
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
  config({
    reporters: [
      createMemoryLogReporter()
    ]
  })
  a.satisfies(store.value.reporters, [{ id: 'memory' }])
  expect(store.value.reporters.length).toBe(1)
})
