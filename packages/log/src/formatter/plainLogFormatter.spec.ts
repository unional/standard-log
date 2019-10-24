import { logLevels, plainLogFormatter } from '..';

test('convert log entries to string', () => {
  const timestamp = new Date(2019, 6)
  const actual = plainLogFormatter({ id: 'plain', level: logLevels.emergency, args: ['emergency'], timestamp })

  expect(actual).toEqual([timestamp.toISOString(), 'plain', `(EMERGENCY)`, `emergency`])
})
