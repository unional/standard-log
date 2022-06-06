import { createStore } from 'global-store'
import { getLogModeFromEnvironment } from './getLogModeFromEnvironment.js'
import { logLevels } from './logLevel.js'
import { LogStore } from './typesInternal.js'

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: '2.0.0',
  initializer: (current) => {
    const mode = getLogModeFromEnvironment() || 'production'
    return {
      addCustomLogLevelListeners: [],
      configured: false,
      loggerClosures: {},
      redirects: {},
      reporters: [],
      customLevels: {},
      customLevelsReverse: [],
      mode,
      logLevel: logLevels.info,
      ...current
    }
  }
})
