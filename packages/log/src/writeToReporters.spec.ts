import delay from 'delay';
import { getLogger } from './getLogger';

test('auto config in first write', async () => {
  const log = getLogger('config-in-first-write')
  log.emergency('first: should see this message')
  log.emergency('second: should see this message')
  await delay(10)
})
