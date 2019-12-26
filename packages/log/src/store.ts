import { createStore } from 'global-store';
import { getLogLevelByMode } from './getLogLevelByMode';
import { getLogModeFromEnvironment } from './getLogModeFromEnvironment';
import { LogStore } from './typesInternal';

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: '2.0.0',
  initializer: (current) => {
    const mode = getLogModeFromEnvironment() || 'production'
    return {
      loggerClosures: {},
      reporters: [],
      customLevels: {},
      customLevelsReverse: [],
      mode,
      logLevel: getLogLevelByMode(mode),
      ...current
    }
  }
})
