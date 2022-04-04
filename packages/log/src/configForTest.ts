import { config } from './config'
import { createMemoryLogReporter } from './memory'
import { store } from './store'
import { LogLevel } from './types'


export function configForTest(logLevel?: LogLevel) {
  store.reset()
  const reporter = createMemoryLogReporter()
  config({
    reporters: [reporter],
    mode: 'test',
    logLevel
  })
  return { reporter }
}
