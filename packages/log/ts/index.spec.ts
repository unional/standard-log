import { testType } from 'type-plus'
import { DEFAULT_LOG_METHOD_NAMES, StandardLog, StandardLogInstance } from './index.js'

describe('type tests', () => {
	it('export types', () => {
		testType.equal<StandardLog, any>(false)
		testType.equal<StandardLogInstance, any>(false)
	})

	it('exports DEFAULT_LOG_METHOD_NAMES', () => {
		expect(DEFAULT_LOG_METHOD_NAMES).toBeDefined()
	})
})
