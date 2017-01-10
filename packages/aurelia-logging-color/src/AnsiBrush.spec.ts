import test from 'ava'
import * as style from 'ansi-styles'

import { AnsiBrush } from './AnsiBrush'

test('background', t => {
  const brush = new AnsiBrush()

  let actual: string[] = []
  for (let i = 0; i <= 50; i++) {
    actual.push(...brush.color(i.toString()))
  }
  console.log.apply(console, actual)

  t.deepEqual(actual, ['\u001b[41m 0 \u001b[0m', '\u001b[42m 1 \u001b[0m', '\u001b[43m 2 \u001b[0m', '\u001b[44m 3 \u001b[0m', '\u001b[45m 4 \u001b[0m', '\u001b[46m 5 \u001b[0m', '\u001b[42;31m 6 \u001b[0m', '\u001b[43;31m 7 \u001b[0m', '\u001b[44;31m 8 \u001b[0m', '\u001b[45;31m 9 \u001b[0m', '\u001b[46;31m 10 \u001b[0m', '\u001b[41;32m 11 \u001b[0m', '\u001b[43;32m 12 \u001b[0m', '\u001b[44;32m 13 \u001b[0m', '\u001b[45;32m 14 \u001b[0m', '\u001b[46;32m 15 \u001b[0m', '\u001b[41;33m 16 \u001b[0m', '\u001b[42;33m 17 \u001b[0m', '\u001b[44;33m 18 \u001b[0m', '\u001b[45;33m 19 \u001b[0m', '\u001b[46;33m 20 \u001b[0m', '\u001b[41;34m 21 \u001b[0m', '\u001b[42;34m 22 \u001b[0m', '\u001b[43;34m 23 \u001b[0m', '\u001b[45;34m 24 \u001b[0m', '\u001b[46;34m 25 \u001b[0m', '\u001b[41;35m 26 \u001b[0m', '\u001b[42;35m 27 \u001b[0m', '\u001b[43;35m 28 \u001b[0m', '\u001b[44;35m 29 \u001b[0m', '\u001b[46;35m 30 \u001b[0m', '\u001b[41;36m 31 \u001b[0m', '\u001b[42;36m 32 \u001b[0m', '\u001b[43;36m 33 \u001b[0m', '\u001b[44;36m 34 \u001b[0m', '\u001b[45;36m 35 \u001b[0m', '\u001b[41;1m 36 \u001b[0m', '\u001b[42;1m 37 \u001b[0m', '\u001b[43;1m 38 \u001b[0m', '\u001b[44;1m 39 \u001b[0m', '\u001b[45;1m 40 \u001b[0m', '\u001b[46;1m 41 \u001b[0m', '\u001b[42;31;1m 42 \u001b[0m', '\u001b[43;31;1m 43 \u001b[0m', '\u001b[44;31;1m 44 \u001b[0m', '\u001b[45;31;1m 45 \u001b[0m', '\u001b[46;31;1m 46 \u001b[0m', '\u001b[41;32;1m 47 \u001b[0m', '\u001b[43;32;1m 48 \u001b[0m', '\u001b[44;32;1m 49 \u001b[0m', '\u001b[45;32;1m 50 \u001b[0m']);
})
