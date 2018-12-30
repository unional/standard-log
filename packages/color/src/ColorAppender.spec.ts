import { addAppender, addCustomLevel, getLogger, logLevel, setLevel } from 'aurelia-logging';
import { ColorAppender } from './ColorAppender';

test('color cycling', () => {
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

test('log error', () => {
  addAppender(new ColorAppender({
    colorMode: 'CSS',
    coloringText: true,
    maxColor: 10
  }))
  const log = getLogger('logError')
  log.error(new Error('expected error') as any)
  // Inspect visually for "%c logError  padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff; Error: expected error ...stack"
})

test('support custom level', () => {
  addCustomLevel('trace', 35)
  ColorAppender.addCustomLevel('trace', 35)
  const log = getLogger('custom level')
  setLevel(34)
    ; (log as any)['trace']('should not trace')
  setLevel(36)
    ; (log as any)['trace']('tracing')
  // Inspect visually
})
