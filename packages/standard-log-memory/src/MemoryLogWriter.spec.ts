import { createMemoryLogWriter } from './MemoryLogWriter';

test('write log', () => {
  const writer = createMemoryLogWriter()
  writer.write({ id: 'log' }, 1, ['some messages'])
  expect(writer.logs).toEqual([
    { id: 'log', level: 1, messages: ['some messages'] }
  ])
})
