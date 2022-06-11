import { logLevels, plainLogFormatter } from 'standard-log'
import { createAnsiFormatter, createColorLogReporter, createCssFormatter } from './index.js'

describe('rendering tests', () => {
  test('default to color rendering', () => {
    const reporter = createColorLogReporter();
    ['emergency', 'info', 'warn', 'debug'].forEach(level => {
      reporter.write({ id: 'color', level: (logLevels as any)[level], args: ['hello', 'world'], timestamp: new Date() })
    })
  })
  test('plain rendering', () => {
    const reporter = createColorLogReporter({ formatter: plainLogFormatter });
    ['emergency', 'info', 'warn', 'debug'].forEach(level => {
      reporter.write({ id: 'plain', level: (logLevels as any)[level], args: ['hello', 'world'], timestamp: new Date() })
    })
  })

  test('different timestamp settings', () => {
    ['none', 'iso', 'elapsed'].forEach((timestamp: any) => {
      const reporter = createColorLogReporter({ formatter: createAnsiFormatter({ timestamp }) })
      reporter.write({ id: timestamp, level: logLevels.info, args: ['hello', 'world'], timestamp: new Date() })
    })
  })
  test('different timestamp settings for css', () => {
    ['none', 'iso', 'elapsed'].forEach((timestamp: any) => {
      const reporter = createColorLogReporter({ formatter: createCssFormatter({ timestamp }) })
      reporter.write({ id: timestamp, level: logLevels.info, args: ['hello', 'world'], timestamp: new Date() })
    })
  })
})

describe('id', () => {
  test('default is "console"', () => {
    const reporter = createColorLogReporter()
    expect(reporter.id).toBe('console')
  })
  test('can be overridden', () => {
    const reporter = createColorLogReporter({ id: 'neo-console' })
    expect(reporter.id).toBe('neo-console')
  })
})

