import test from 'ava'
import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'

import { ColorAppender } from './ColorAppender'

test('color cycling', t => {
  addAppender(new ColorAppender())
  setLevel(logLevel.debug)
  for (let i = 0; i < 25; i++) {
    let log = getLogger(`logger ${i}`)
    log.debug('debug', Date.now())
    log.info('info', Date.now())
    log.warn('warn', Date.now())
    log.error('error', Date.now())
  }
})
