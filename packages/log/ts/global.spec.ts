import { a } from 'assertron'
import { configGlobal, ctx } from './global.js'
import { createMemoryLogReporter, getLogger, logLevels } from './index.js'

describe('getLogger()', () => {
  it('gets a logger that logs to console by default', () => {
    const log = getLogger(['default'])
    log.info('from global log, expected to be printed')
    log.debug('from global log, this should not be printed')
  })
})

describe('configGlobal()', () => {
  beforeEach(() => {
    ctx.gsl = undefined
    ctx.configured = false
  })
  it('configure the global instance', () => {
    const mem = createMemoryLogReporter()
    configGlobal({ logLevel: logLevels.error, reporters: [mem] })

    const log = getLogger(['default'])
    log.error('error message')
    log.info('info message')
    expect(mem.logs.length).toBe(1)
  })
  it('can call after getLogger', () => {
    const log = getLogger(['default'])
    log.info('from global log, expected to be printed')

    const mem = createMemoryLogReporter()
    configGlobal({ logLevel: logLevels.error, reporters: [mem] })
    log.error('from global log, expected to be printed')
    log.info('from global log, this should not be printed')
    expect(mem.logs.length).toBe(1)
  })
  it('will emit a warning when called twice', () => {
    const mem = createMemoryLogReporter()
    configGlobal({ reporters: [mem] })
    configGlobal({ reporters: [] })
    a.satisfies(mem.logs, [{ id: 'standard-log', level: logLevels.warn, args: [/being called more than once/] }])
  })
})
