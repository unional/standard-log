import a from 'assertron';
import { addLogReporter, clearLogReporters, config, createMemoryLogReporter, getLogReporter, ProhibitedDuringProduction } from '.';
import { store } from './store';
import { createConsoleLogReporter } from './console';
import { LogFilter } from './types';
import { logLevels } from './logLevel';
import { hasConsoleReporter } from './logReporter';

beforeEach(() => {
  store.reset()
  config({ mode: 'test' })
})

describe('addLogReporter()', () => {
  test('throws in production mode', () => {
    config({ mode: 'production' })
    const reporter = createMemoryLogReporter()
    a.throws(() => addLogReporter(reporter), ProhibitedDuringProduction)
  })

  test('adds log reporter', () => {
    const count = store.value.reporters.length
    const reporter = createMemoryLogReporter()
    addLogReporter(reporter)

    expect(store.value.reporters.length).toBe(count + 1)
  })

  describe('add another console reporter', () => {
    test('will replace existing one', () => {
      expect(getLogReporter('console')).toBeDefined()
      addLogReporter(createConsoleLogReporter({ id: 'c2' }))
      expect(getLogReporter('c2')).toBeDefined()
      expect(getLogReporter('console')).toBeUndefined()
    })

    test('will carry over existing filter', () => {
      const filter: LogFilter = entry => entry.level < logLevels.alert
      addLogReporter(createConsoleLogReporter({ id: 'c2', filter }))
      addLogReporter(createConsoleLogReporter({ id: 'c3' }))
      const c3 = getLogReporter('c3')!
      expect(c3.filter).toBe(filter)
    })

    test('will combine existing filter and new filter', () => {
      addLogReporter(createConsoleLogReporter({ id: 'c2', filter: entry => entry.level > logLevels.critical }))
      addLogReporter(createConsoleLogReporter({ id: 'c3', filter: entry => entry.level < logLevels.error }))
      const c3 = getLogReporter('c3')!
      expect(c3.filter({ level: logLevels.info } as any)).toBe(false)
      expect(c3.filter({ level: logLevels.alert } as any)).toBe(false)
    })
  })
})

describe('getLogReporter()', () => {
  test('get log reporter by id', () => {
    expect(getLogReporter('console')).toBeDefined()
  })

  test('get log reporter with unknown id gets undefined', () => {
    expect(getLogReporter('blah')).toBeUndefined()
  })
})

describe('clearLogReporters()', () => {
  test('throws in production mode', () => {
    config({ mode: 'production' })
    a.throws(() => clearLogReporters(), ProhibitedDuringProduction)
  })

  test('removes all reporters', () => {
    clearLogReporters()

    expect(store.value.reporters.length).toBe(0)
  })
})

describe('hasConsoleReporter()', () => {
  test('returns true if there is a console reporter', () => {
    expect(hasConsoleReporter()).toBeTruthy()
  })
  test('returns false if there is no console reporter', () => {
    clearLogReporters()
    expect(hasConsoleReporter()).toBeFalsy()
    addLogReporter(createMemoryLogReporter())
    expect(hasConsoleReporter()).toBeFalsy()
  })
})
