import a from 'assertron';
import { clearCustomLogLevel, logLevel, toLogLevelName } from 'standard-log-core';
import { createMemoryLogReporter } from 'standard-log-memory';
import { config } from './config';
import { resetStore, store } from './store';

afterEach(() => {
  clearCustomLogLevel()
  resetStore()
})

test('configure default logLevel', () => {
  config({
    logLevel: logLevel.planck
  })

  expect(store.get().logLevel).toBe(logLevel.planck)
})

test('configue to use default reporter', () => {
  clearReporters()

  config({
    reporters: [
      'default'
    ]
  })
  a.satisfies(store.get().reporters, [{ id: 'default' }])
  expect(store.get().reporters.length).toBe(1)
})

test('configure to use a reporter instance', () => {
  clearReporters()

  config({
    reporters: [
      createMemoryLogReporter()
    ]
  })
  a.satisfies(store.get().reporters, [{ id: 'memory' }])
  expect(store.get().reporters.length).toBe(1)
})

test('add custom levels', () => {
  config({
    customLevels: {
      'urgent': 80
    }
  })

  expect(toLogLevelName(80)).toBe('urgent')
})

function clearReporters() {
  const reporters = store.get().reporters
  reporters.splice(0, reporters.length)
}
