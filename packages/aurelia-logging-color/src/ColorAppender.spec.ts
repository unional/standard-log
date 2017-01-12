import test from 'ava'
import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'

import { ColorAppender } from './ColorAppender'

test('color cycling', _t => {
  addAppender(new ColorAppender())
  setLevel(logLevel.debug)
  for (let i = 0; i < 25; i++) {
    let log = getLogger(`logger ${i}`)
    log.debug('x    ', Date.now())
    log.info(' x  ', Date.now())
    log.warn('  x ', Date.now())
    log.error('   x', Date.now())
  }
})
