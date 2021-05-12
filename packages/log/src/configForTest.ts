import { config } from './config'
import { createMemoryLogReporter } from './memory'
import { LogLevel } from './types'


export function configForTest(logLevel?: LogLevel) {
  const reporter = createMemoryLogReporter()
  config({
    reporters: [reporter],
    mode: 'test',
    logLevel
  })
  return { reporter }
}
