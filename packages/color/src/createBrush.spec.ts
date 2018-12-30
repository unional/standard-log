import t from 'assert'

import { Ansi16mBrush } from './Ansi16mBrush'
import { AnsiBrush } from './AnsiBrush'
import { CSSBrush } from './CSSBrush'
import { createBrush, PlainBrush } from './createBrush'

test('create correct brushes', () => {
  let brush = createBrush({
    colorMode: 'CSS'
  })
  t(brush instanceof CSSBrush)

  brush = createBrush({
    colorMode: 'ANSI'
  })
  t(brush instanceof AnsiBrush)

  brush = createBrush({
    colorMode: 'ANSI16M'
  })
  t(brush instanceof Ansi16mBrush)

  brush = createBrush({
    colorMode: 'NONE'
  })
  t(brush instanceof PlainBrush)
})

test('PlainBrush', () => {
  const brush = new PlainBrush()
  t.deepStrictEqual(brush.color('test'), ['test'])
})
