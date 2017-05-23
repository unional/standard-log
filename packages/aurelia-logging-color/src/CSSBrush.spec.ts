// tslint:disable quotemark
import test from 'ava'

import { CSSBrush } from './CSSBrush'

test('work with null', t => {
  const brush = new CSSBrush({ maxColor: 10 })
  const actual = brush.color('a', null)
  t.deepEqual(actual, ["%c a ", "padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;", null])
})

test('background', t => {
  const brush = new CSSBrush({ maxColor: 10 })

  let actual: string[][] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(brush.color(i.toString()))
  }

  t.deepEqual(actual, [['%c 0 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'], ['%c 1 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;'], ['%c 2 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;'], ['%c 3 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;'], ['%c 4 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;'], ['%c 5 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;'], ['%c 6 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;'], ['%c 7 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;'], ['%c 8 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;'], ['%c 9 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;'], ['%c 10 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;']])
})

test('text', t => {
  const brush = new CSSBrush({ maxColor: 10 })

  let actual: string[][] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(brush.color(i.toString()))
  }
  t.deepEqual(actual, [['%c 0 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'], ['%c 1 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;'], ['%c 2 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;'], ['%c 3 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;'], ['%c 4 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;'], ['%c 5 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;'], ['%c 6 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;'], ['%c 7 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;'], ['%c 8 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;'], ['%c 9 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;'], ['%c 10 ', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;']])
})

test('multiple colors', t => {
  const brush = new CSSBrush()
  const actual = brush.color('myLogger', '%c SomeColored Text %c AnotherColor', 'color:blue;', 'color:red;', 'not colored')
  t.deepEqual(actual, ['%c myLogger %c SomeColored Text %c AnotherColor', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;', 'color:blue;', 'color:red;', 'not colored'])
})
