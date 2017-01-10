import test from 'ava'

import { Ansi16mBrush } from './Ansi16mBrush'
import { AnsiBrush } from './AnsiBrush'
import { CSSBrush } from './CSSBrush'
import { createBrush, PlainBrush } from './createBrush'

test('create correct brushes', t => {
  let brush = createBrush({
    css: true,
    ansi: false,
    ansi16m: false
  })
  t.true(brush instanceof CSSBrush)

  brush = createBrush({
    css: false,
    ansi: true,
    ansi16m: false
  })
  t.true(brush instanceof AnsiBrush)

  brush = createBrush({
    css: false,
    ansi: false,
    ansi16m: true
  })
  t.true(brush instanceof Ansi16mBrush)

  brush = createBrush({
    css: false,
    ansi: false,
    ansi16m: false
  })
  t.true(brush instanceof PlainBrush)
})

test('PlainBrush', t => {
  const brush = new PlainBrush()
  t.is(brush.paint('test'), 'test')
})
