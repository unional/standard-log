import { logLevel } from 'standard-log-core';
import { LogEntry } from './LogEntry';

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
    { id: 'log', level: logLevel.trace, messages: ['trace'] }
  ])

  expect(actual).toEqual(`log EMERGENCY emergency
log CRITICAL critical
log ALERT alert
log ERROR error
log WARN warn
log NOTICE notice
log INFO info
log DEBUG debug
log TRACE trace`)
})
