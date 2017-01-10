import test from 'ava'
import * as style from 'ansi-styles'

import { AnsiBrush } from './AnsiBrush'

test('background', t => {
  const brush = new AnsiBrush()

  let actual: string[] = []
  for (let i = 0; i <= 50; i++) {
    actual.push(brush.paint(i.toString()))
  }
  console.log.apply(console, actual)

  t.deepEqual(actual, ['\u001b[41m0\u001b[0m', '\u001b[42m1\u001b[0m', '\u001b[43m2\u001b[0m', '\u001b[44m3\u001b[0m', '\u001b[45m4\u001b[0m', '\u001b[46m5\u001b[0m', '\u001b[42;31m6\u001b[0m', '\u001b[43;31m7\u001b[0m', '\u001b[44;31m8\u001b[0m', '\u001b[45;31m9\u001b[0m', '\u001b[46;31m10\u001b[0m', '\u001b[41;32m11\u001b[0m', '\u001b[43;32m12\u001b[0m', '\u001b[44;32m13\u001b[0m', '\u001b[45;32m14\u001b[0m', '\u001b[46;32m15\u001b[0m', '\u001b[41;33m16\u001b[0m', '\u001b[42;33m17\u001b[0m', '\u001b[44;33m18\u001b[0m', '\u001b[45;33m19\u001b[0m', '\u001b[46;33m20\u001b[0m', '\u001b[41;34m21\u001b[0m', '\u001b[42;34m22\u001b[0m', '\u001b[43;34m23\u001b[0m', '\u001b[45;34m24\u001b[0m', '\u001b[46;34m25\u001b[0m', '\u001b[41;35m26\u001b[0m', '\u001b[42;35m27\u001b[0m', '\u001b[43;35m28\u001b[0m', '\u001b[44;35m29\u001b[0m', '\u001b[46;35m30\u001b[0m', '\u001b[41;36m31\u001b[0m', '\u001b[42;36m32\u001b[0m', '\u001b[43;36m33\u001b[0m', '\u001b[44;36m34\u001b[0m', '\u001b[45;36m35\u001b[0m', '\u001b[41;1m36\u001b[0m', '\u001b[42;1m37\u001b[0m', '\u001b[43;1m38\u001b[0m', '\u001b[44;1m39\u001b[0m', '\u001b[45;1m40\u001b[0m', '\u001b[46;1m41\u001b[0m', '\u001b[42;31;1m42\u001b[0m', '\u001b[43;31;1m43\u001b[0m', '\u001b[44;31;1m44\u001b[0m', '\u001b[45;31;1m45\u001b[0m', '\u001b[46;31;1m46\u001b[0m', '\u001b[41;32;1m47\u001b[0m', '\u001b[43;32;1m48\u001b[0m', '\u001b[44;32;1m49\u001b[0m', '\u001b[45;32;1m50\u001b[0m']);
})
