import a from 'assertron';
import { config, createMemoryLogReporter, ProhibitedDuringProduction } from '..';
import { store } from '../store';

beforeEach(() => {
  store.reset()
  config({ mode: 'test' })
})
test('log entries are saved in the `logs` property', () => {
  const reporter = createMemoryLogReporter()
  const entry = { id: 'log', level: 1, args: ['some messages'], timestamp: new Date() }
  reporter.write(entry)
  expect(reporter.logs).toEqual([entry])
})

test('can override id', () => {
  const reporter = createMemoryLogReporter({ id: 'custom-id-mem' })
  expect(reporter.id).toBe('custom-id-mem')
})

test('can filter', () => {
  const reporter = createMemoryLogReporter({ filter(entry) { return entry.id !== 'secret' } })
  reporter.write({ id: 'ok', level: 1, args: ['some messages'], timestamp: new Date() })
  reporter.write({ id: 'secret', level: 1, args: ['some messages'], timestamp: new Date() })
  expect(reporter.logs.length).toBe(1)
})

test('can change filter', () => {
  const reporter = createMemoryLogReporter()
  const filter = reporter.filter
  reporter.filter = entry => entry.id !== 'secret'
  expect(reporter.filter).not.toEqual(filter)
})

test('set filter in production mode throws', () => {
  config({ mode: 'production' })
  const reporter = createMemoryLogReporter()
  a.throws(() => { reporter.filter = () => true }, ProhibitedDuringProduction)
})

test('formatter can be used to pre-process the log', () => {
  const reporter = createMemoryLogReporter({
    formatter: (entry) => ({
      ...entry,
      args: entry.args.map(arg => arg === 'secret' ? '<censored>' : arg)
    })
  })

  const entry = { id: 'log', level: 1, args: ['a', 'secret', 'b'], timestamp: new Date() }
  reporter.write(entry)

  expect(reporter.logs[0].args[1]).toBe('<censored>')
})

test('can change formatter', () => {
  const reporter = createMemoryLogReporter()
  const formatter = reporter.formatter
  reporter.formatter = e => ({ ...e, args: e.args.reverse() })
  expect(reporter.formatter).not.toEqual(formatter)
})

test('set formatter in production mode throws', () => {
  config({ mode: 'production' })
  const reporter = createMemoryLogReporter()

  a.throws(() => { reporter.formatter = e => e }, ProhibitedDuringProduction)
})
