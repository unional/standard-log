import delay from 'delay';
import { getLogger } from './getLogger';
import { store } from './store';
import { captureWrittenLog } from './testUtil';
import { logLevel } from './logLevel';

test('in non test mode the logs are sent to reporters out of band', async () => {
  store.value.mode = 'devel'
  store.value.logLevel = logLevel.debug
  const c = captureWrittenLog()
  const log = getLogger('delay-write')
  log.emergency('ouch')

  expect(c.logs.length).toBe(0)
  await delay(10)
  expect(c.logs.length).toBe(1)
})
