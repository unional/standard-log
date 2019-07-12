import { createMemoryLogReporter } from '.';

test('log entries are saved in the `logs` property', () => {
  const writer = createMemoryLogReporter()
  const entry = { id: 'log', level: 1, args: ['some messages'], timestamp: new Date() }
  writer.write(entry)
  expect(writer.logs).toEqual([entry])
})
