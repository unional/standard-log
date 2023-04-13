import { isType } from 'type-plus'
import { StandardLog, StandardLogInstance, DEFAULT_LOG_METHOD_NAMES } from './index.js'

describe('type tests', () => {
	it('export types', () => {
		isType.equal<false, void, StandardLog>()
		isType.equal<false, void, StandardLogInstance>()
	})

	it('exports DEFAULT_LOG_METHOD_NAMES', () => {
		expect(DEFAULT_LOG_METHOD_NAMES).toBeDefined()
	})
})
