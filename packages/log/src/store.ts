import { createStore } from 'global-store';
import { getLogModeFromEnvironment } from './getLogModeFromEnvironment';
import { logLevel } from './logLevel';
import { LogStore } from './typesInternal';

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: '1.0.0',
  initializer: (current) => {
    const mode = getLogModeFromEnvironment() || 'prod'
    return {
      loggers: {},
      reporters: [],
      customLevels: {},
      customLevelsReverse: [],
      mode,
      logLevel: mode === 'prod' ? logLevel.warn : logLevel.debug,
      ...current
    }
  }
})
