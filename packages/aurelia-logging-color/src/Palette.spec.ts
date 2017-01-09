import test from 'ava'
import * as style from 'ansi-styles'

import { Palette } from './Palette'

test('background', t => {
  const p = new Palette({ colorMode: 'ANSI', maxColor: 10 })
  let actual: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(p.color(i.toString()))
  }
  console.log.apply(console, actual)

  t.deepEqual(actual, ['\u001b[48;2;150;0;90m0\u001b[49m', '\u001b[48;2;0;0;200m1\u001b[49m', '\u001b[48;2;0;18;255m2\u001b[49m', '\u001b[48;2;0;18;255m3\u001b[49m', '\u001b[48;2;0;106;255m4\u001b[49m', '\u001b[48;2;44;179;150m5\u001b[49m', '\u001b[48;2;151;179;0m6\u001b[49m', '\u001b[48;2;255;164;0m7\u001b[49m', '\u001b[48;2;255;164;0m8\u001b[49m', '\u001b[48;2;255;78;0m9\u001b[49m', '\u001b[48;2;150;0;90m10\u001b[49m']);

  const pb = new Palette({ colorMode: 'CSS', maxColor: 10 })
  let actual2: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual2.push(pb.color(i.toString()))
  }
  t.deepEqual(actual2, ['padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'])

  const pn = new Palette({ colorMode: 'NONE' })
  let actual3: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual3.push(pn.color(i.toString()))
  }
  t.deepEqual(actual3, ['0','1','2','3','4','5','6','7','8','9','10'])
})

test('text', t => {
  const p = new Palette({ colorMode: 'ANSI', maxColor: 10, coloringText: true })
  let actual: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual.push(p.color(i.toString()))
  }
  console.log.apply(console, actual)

  t.deepEqual(actual, ['\u001b[38;2;150;0;90m0\u001b[39m', '\u001b[38;2;0;0;200m1\u001b[39m', '\u001b[38;2;0;25;255m2\u001b[39m', '\u001b[38;2;0;25;255m3\u001b[39m', '\u001b[38;2;0;152;255m4\u001b[39m', '\u001b[38;2;44;255;150m5\u001b[39m', '\u001b[38;2;151;255;0m6\u001b[39m', '\u001b[38;2;255;234;0m7\u001b[39m', '\u001b[38;2;255;234;0m8\u001b[39m', '\u001b[38;2;255;111;0m9\u001b[39m', '\u001b[38;2;150;0;90m10\u001b[39m']);

  const pb = new Palette({ colorMode: 'CSS', maxColor: 10, coloringText: true })
  let actual2: string[] = []
  for (let i = 0; i <= 10; i++) {
    actual2.push(pb.color(i.toString()))
  }
  t.deepEqual(actual2, ['padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0000c8;bother: 1px solid #0000a8;color: #ffffff;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0019ff;bother: 1px solid #0000df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #0098ff;bother: 1px solid #0078df;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #2cff96;bother: 1px solid #0cdf76;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #97ff00;bother: 1px solid #77df00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ffea00;bother: 1px solid #dfca00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #ff6f00;bother: 1px solid #df4f00;color: #000000;', 'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;bother: 1px solid #76003a;color: #ffffff;'])
})
