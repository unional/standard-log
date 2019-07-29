import { captureWrittenLog } from '../testUtil';
import { config } from '..';
import { getLogger } from '../getLogger';
import delay from 'delay'

test('in non test mode the logs are sent to reporters out of band', async () => {
  config({ mode: 'devel' })
  const c = captureWrittenLog()
  const log = getLogger('delay-write')
  log.emergency('ouch')

  expect(c.logs.length).toBe(0)
  await delay(10)
  expect(c.logs.length).toBe(1)
})
