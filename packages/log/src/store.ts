import { createConsoleLogReporter, isBrowser, Logger, LogLevel, logLevel, LogLevelListener, LogMode, LogReporter } from '@standard-log/core';
import { createStore, compareVersion } from 'global-store';
import { getMode } from './env';
import { getLogLevelByMode } from './getLogLevelByMode';

export type LogStore = {
  mode: LogMode,
  logLevel: LogLevel,
  loggers: Record<string, Logger<any>>,
  reporters: LogReporter[],
  configured: boolean,
  customLevels: Record<string, number>,
  customLevelsReverse: string[],
  addCustomLogLevelListeners: LogLevelListener[]
}

export const store = createStore<LogStore>({
  moduleName: 'standard-log',
  key: 'e53d0937-f420-40a0-9901-099725fa4a53',
  version: '1.0.0',
  initializer: (current, versions) => {
    if (versions.some(v => compareVersion(v, '1.0.0') > 0)) {
      return current
    }
    return {
      ...current,
      reporters: [getDefaultReporter()],
      ...getEnvironmentDefaults()
    }
  }
})

function getEnvironmentDefaults(): Pick<LogStore, 'mode' | 'logLevel'> {
  // istanbul ignore next
  if (isBrowser()) {
    return {
      mode: 'prod' as LogMode,
      logLevel: logLevel.warn
    }
  }
  else {
    const mode = getMode(process.env)
    return {
      mode,
      logLevel: getLogLevelByMode(mode)
    }
  }
}

function getDefaultReporter() {
  try {
    // tricks webpack to not bundle standard-log-color
    const c = '-color'
    const consoleModule = require('standard-log' + c)
    return consoleModule.createColorLogReporter()
  }
  catch (e) {
    // istanbul ignore next
    return createConsoleLogReporter()
  }
}
