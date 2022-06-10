import { createStandardLogForTest } from './createStandardLog.js'
import { suppressLogs } from './suppressLogs.js'

test('suppress log', () => {
  const sl = createStandardLogForTest()
  const log = sl.getLogger(['l'])
  suppressLogs(() => {
    log.alert('should not see me')
  }, log)

  expect(sl.reporter.getLogMessageWithLevel()).toBe('')
})

test('suppress multiple logs', () => {
  const sl = createStandardLogForTest()
  const log1 = sl.getLogger(['l1'])
  const log2 = sl.getLogger(['l2'])
  suppressLogs(() => {
    log1.alert('should not see me')
    log2.alert('should not see me too')
  }, log1, log2)
  expect(sl.reporter.getLogMessageWithLevel()).toBe('')
})

test('return block result', () => {
  const sl = createStandardLogForTest()
  const log1 = sl.getLogger(['l'])
  const log2 = sl.getLogger(['l2'])
  const a = suppressLogs(() => 1, log1, log2)
  expect(a).toBe(1)
})
