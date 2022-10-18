import { toLogLevel } from './logLevels.js'

describe(`${toLogLevel.name}()`, () => {
  it('returns undefined if value is not a default log level name', () => {
    const result = toLogLevel('unknown')
    expect(result).toBeUndefined()
  })
})
