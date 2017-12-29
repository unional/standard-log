import test from 'ava'
import { addAppender, setLevel, getLogger, logLevel, addCustomLevel } from 'aurelia-logging'

import { ColorAppender } from './ColorAppender'

test('color cycling', t => {
  addAppender(new ColorAppender())
  setLevel(logLevel.debug)
  for (let i = 0; i < 25; i++) {
    let log = getLogger(`logger ${i}`)
    log.debug('x    ', Date.now())
    log.info(' x  ', Date.now())
    log.warn('  x ', Date.now())
    log.error('   x', Date.now())
  }
  t.pass()
})

test('log error', t => {
  addAppender(new ColorAppender({
    colorMode: 'CSS',
    coloringText: true,
    maxColor: 10
  }))
  const log = getLogger('logError')
  log.error(new Error('oh??') as any)
  t.pass()
  // Inspect visually for "%c logError  padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff; Error: oh?? ...stack"
})

test('support custom level', t => {
  addCustomLevel('trace', 35)
  ColorAppender.addCustomLevel('trace', 35)
  const log = getLogger('custom level')
  setLevel(34)
  log['trace']('should not trace')
  setLevel(36)
  log['trace']('tracing')
  t.pass()
  // Inspect visually
})
