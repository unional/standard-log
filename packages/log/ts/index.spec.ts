import { isType } from 'type-plus'
import { StandardLog, StandardLogForTest, StandardLogInstance } from './standardLog.js'

describe('type tests', () => {
  it('export types', () => {
    isType.equal<false, void, StandardLog>()
    isType.equal<false, void, StandardLogForTest>()
    isType.equal<false, void, StandardLogInstance>()
  })
})
