import { getLogger, getLoggers } from '..';

test('filter loggers by id', () => {
  getLogger('filter')
  expect(getLoggers(/filter/).length).toBe(1)
})
