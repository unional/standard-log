import test from 'ava'
import * as style from 'ansi-styles'

import { CSSBrush } from './CSSBrush'

test('background', t => {
  const brush = new CSSBrush({ maxColor: 10 })

  let actual: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(brush.paint(i.toString()))
  }
  t.deepEqual(actual, ['padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'])
})

test('text', t => {
  const brush = new CSSBrush({ maxColor: 10 })

  let actual: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(brush.paint(i.toString()))
  }
  t.deepEqual(actual, ['padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'])
})
