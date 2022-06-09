import { configForTest } from './index.js'
import { getLogger } from './getLogger.js'
import { logLevels } from './logLevels.js'

test('config in test mode and return the memory reporter', () => {
  const { reporter } = configForTest()
  getLogger('config-for-test').info('ha')
  expect(reporter.getLogMessage()).toEqual('ha')
})

test('set log level', () => {
  const { reporter } = configForTest(logLevels.warn)
  getLogger('config-for-test').info('no')
  getLogger('config-for-test').warn('yes')
  expect(reporter.getLogMessage()).toEqual('yes')
})
