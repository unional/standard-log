import { config } from './config.js'
import { createMemoryLogReporter } from './memory/index.js'
import { store } from './store.js'
import { LogLevel } from './types.js'


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
