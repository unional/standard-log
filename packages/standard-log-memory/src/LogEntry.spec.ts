import { LogEntry } from './LogEntry';
import { logLevel } from 'standard-log-core';

test('convert log entries to string', () => {
  const actual = LogEntry.toString([
    { id: 'log', level: logLevel.emergency, messages: ['emergency'] },
    { id: 'log', level: logLevel.critical, messages: ['critical'] },
    { id: 'log', level: logLevel.alert, messages: ['alert'] },
    { id: 'log', level: logLevel.error, messages: ['error'] },
    { id: 'log', level: logLevel.warn, messages: ['warn'] },
    { id: 'log', level: logLevel.notice, messages: ['notice'] },
    { id: 'log', level: logLevel.info, messages: ['info'] },
    { id: 'log', level: logLevel.debug, messages: ['debug'] },
    { id: 'log', level: logLevel.trace, messages: ['trace'] },
  ])

  expect(actual).toEqual(`log emergency emergency
log critical critical
log alert alert
log error error
log warn warn
log notice notice
log info info
log debug debug
log trace trace`)
})
