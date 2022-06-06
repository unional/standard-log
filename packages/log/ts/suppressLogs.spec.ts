import { configForTest } from './configForTest.js'
import { getLogger } from './getLogger.js'
import { logLevels } from './logLevel.js'
import { MemoryLogReporter } from './memory/index.js'
import { suppressLogs } from './suppressLogs.js'

let reporter: MemoryLogReporter
beforeEach(() => reporter = configForTest(logLevels.all).reporter)

test('suppress log', () => {
  const log = getLogger('l')
  suppressLogs(() => {
    log.alert('should not see me')
  }, log)

  expect(reporter.getLogMessageWithLevel()).toBe('')
})

test('suppress multiple logs', () => {
  const log1 = getLogger('l1')
  const log2 = getLogger('l2')
  suppressLogs(() => {
    log1.alert('should not see me')
    log2.alert('should not see me too')
  }, log1, log2)
  expect(reporter.getLogMessageWithLevel()).toBe('')
})

test('return block result', () => {
  const log1 = getLogger('l')
  const log2 = getLogger('l2')
  const a = suppressLogs(() => 1, log1, log2)
  expect(a).toBe(1)
})
