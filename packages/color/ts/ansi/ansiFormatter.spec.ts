import { logLevels } from 'standard-log'
import { createAnsiFormatter } from './ansiFormatter.js'

describe('rendering', () => {
  it('renders using reasonable foreground to keep id readable', () => {
    const formatter = createAnsiFormatter()

    const entries = ['emergency', 'info', 'warn', 'debug']
      .flatMap(level => ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan'].map(color => {
        return {
          id: `${level}:${color}`,
          level: (logLevels as any)[level],
          args: ['render with', 'console', '\n'],
          timestamp: new Date()
        }
      }))

    console.info(...entries.flatMap(formatter))
  })
})
