import a from 'assertron';
import { clearCustomLogLevel, logLevel, toLogLevelName } from 'standard-log-core';
import { createMemoryLogReporter } from 'standard-log-memory';
import { clearLogReporters, config } from '.';
import { resetStore, store } from './store';

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
