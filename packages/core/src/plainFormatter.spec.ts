import { logLevel } from 'standard-log-core';
import { plainFormatter } from '.';

test('convert log entries to string', () => {
  const timestamp = new Date(2019, 6)
  const actual = plainFormatter({ id: 'plain', level: logLevel.emergency, args: ['emergency'], timestamp })

  expect(actual).toEqual([timestamp.toISOString(), 'plain', `(EMERGENCY)`, `emergency`])
})
