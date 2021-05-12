import { configForTest } from '.'
import { getLogger } from './getLogger'
import { logLevels } from './logLevel'

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
