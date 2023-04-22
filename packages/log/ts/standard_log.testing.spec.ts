import { logLevels } from './index.js'
import { createStandardLogForTest } from './testing/index.js'

it('returns with memory reporter', () => {
	const { reporter } = createStandardLogForTest()
	expect(reporter.getLogMessageWithLevel()).toBe('')
})

it('defaults to debug', () => {
	const store = createStandardLogForTest()
	expect(store.logLevel).toBe(logLevels.debug)
})

it('can use emitLog to send log to console', async () => {
	const sl = createStandardLogForTest({ emitLog: true })
	const log = sl.getLogger('test')
	log.info('expected log emitted to console')
	expect(sl.reporter.getLogMessages()).toEqual(['expected log emitted to console'])
})
