import delay from 'delay';
import { getLogger } from './getLogger';
import { logLevel } from './logLevel';
import { store } from './store';
import { captureWrittenLog } from './testUtil';

test('in non test mode the logs are sent to reporters out of band', async () => {
  store.value.mode = 'development'
  store.value.logLevel = logLevel.debug
  const c = captureWrittenLog()
  const log = getLogger('delay-write')
  log.emergency('ouch')

  expect(c.logs.length).toBe(0)
  await delay(10)
  expect(c.logs.length).toBe(1)
  c.reset()
})

test('auto config in first write', async () => {
  const log = getLogger('config-in-first-write')
  log.emergency('first: should see this message')
  log.emergency('second: should see this message')
  await delay(10)
})
