import test from 'ava'
import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'

import { ColorAppender } from './ColorAppender'

test('color cycling', t => {
  addAppender(new ColorAppender())
  setLevel(logLevel.debug)
  for (let i = 0; i < 25; i++) {
    let log = getLogger(`logger ${i}`)
    log.debug('debug')
    log.info('info')
    log.warn('warn')
    log.error('error')
  }
})
