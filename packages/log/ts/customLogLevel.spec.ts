import a from 'assertron'
import { addCustomLogLevel, clearCustomLogLevel, getCustomLevels, getLogger, logLevels } from './index.js'
import { config } from './config.js'
import { createMemoryLogReporter } from './memory.js'
import { store } from './store.js'

afterEach(() => store.reset())

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', logLevels.none + 1)
    addCustomLogLevel('c2', logLevels.none + 2)
    expect(getCustomLevels().length).toBe(2)

    clearCustomLogLevel()

    expect(getCustomLevels().length).toBe(0)
  })
})

test('custom level will not write if log level is lower', () => {
  const memReporter = createMemoryLogReporter()
  config({
    mode: 'test',
    reporters: [memReporter]
  })

  addCustomLogLevel('c1', logLevels.debug + 1)
  const log = getLogger<'c1'>('custom-level-not-write')
  log.c1('will not write this')

  expect(memReporter.logs.length).toEqual(0)
})

test('custom level method is readonly', () => {
  addCustomLogLevel('c1', logLevels.debug + 1)
  const log = getLogger<'c1'>('custom method readonly')
  a.throws(() => { log.c1 = () => { } })
})
