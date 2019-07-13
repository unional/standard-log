import { createMemoryLogReporter } from '.';

test('log entries are saved in the `logs` property', () => {
  const reporter = createMemoryLogReporter()
  const entry = { id: 'log', level: 1, args: ['some messages'], timestamp: new Date() }
  reporter.write(entry)
  expect(reporter.logs).toEqual([entry])
})

test('formatter can be used to pre-process the log', () => {
  const reporter = createMemoryLogReporter({
    formatter: (entry) => ({
      args: entry.args.map(arg => arg === 'secret' ? '<censored>' : arg)
    })
  })

  const entry = { id: 'log', level: 1, args: ['a', 'secret', 'b'], timestamp: new Date() }
  reporter.write(entry)

  expect(reporter.logs[0].args[1]).toBe('<censored>')
})
