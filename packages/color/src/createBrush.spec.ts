import test from 'ava'

import { Ansi16mBrush } from './Ansi16mBrush'
import { AnsiBrush } from './AnsiBrush'
import { CSSBrush } from './CSSBrush'
import { createBrush, PlainBrush } from './createBrush'

test('create correct brushes', t => {
  let brush = createBrush({
    colorMode: 'CSS'
  })
  t.true(brush instanceof CSSBrush)

  brush = createBrush({
    colorMode: 'ANSI'
  })
  t.true(brush instanceof AnsiBrush)

  brush = createBrush({
    colorMode: 'ANSI16M'
  })
  t.true(brush instanceof Ansi16mBrush)

  brush = createBrush({
    colorMode: 'NONE'
  })
  t.true(brush instanceof PlainBrush)
})

test('PlainBrush', t => {
  const brush = new PlainBrush()
  t.deepEqual(brush.color('test'), ['test'])
})
