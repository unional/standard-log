import a from 'assertron';
import { anything } from 'satisfier';
import { logLevel } from 'standard-log-core';
import { createCssFormatter } from './cssFormatter';

const cssFormatter = createCssFormatter()

test('same logger will get the same color', () => {
  const a = cssFormatter({ id: 'log', level: logLevel.critical, args: ['a'], timestamp: new Date() })
  const b = cssFormatter({ id: 'log', level: logLevel.critical, args: ['a'], timestamp: new Date() })
  expect(a[1]).toEqual('padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;border: 1px solid #76003a;color: #ffffff;')
  expect(a[1]).toEqual(b[1])
})

test('support color template', () => {
  const actual = cssFormatter({ id: 'color-template', level: logLevel.critical, args: ['%c SomeColored Text %c AnotherColor', 'color:blue;', 'color:red;', 'not colored'], timestamp: new Date() })
  a.satisfies(actual, [
    '%c color-template %c SomeColored Text %c AnotherColor',
    'padding: 2px; margin: 2px; line-height: 1.8em;background: #96005a;border: 1px solid #76003a;color: #ffffff;',
    'color:blue;',
    'color:red;',
    'not colored',
    anything
  ])
})
