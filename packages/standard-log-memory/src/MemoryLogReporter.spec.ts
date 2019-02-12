import { createMemoryLogReporter } from './MemoryLogReporter';

test('log entries are saved in the `logs` property', () => {
  const writer = createMemoryLogReporter()
  const entry = { loggerId: 'log', level: 1, messages: ['some messages'], timestamp: new Date() }
  writer.write(entry)
  expect(writer.logs).toEqual([entry])
})
