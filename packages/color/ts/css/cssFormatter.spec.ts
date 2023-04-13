import { logLevels } from 'standard-log'
import { a } from 'assertron'
import { anything } from 'satisfier'
import { createCssFormatter } from './cssFormatter.js'

const cssFormatter = createCssFormatter()

test('same logger will get the same color', () => {
	const a = cssFormatter({ id: 'log', level: logLevels.critical, args: ['a'], timestamp: new Date() })
	const b = cssFormatter({ id: 'log', level: logLevels.critical, args: ['a'], timestamp: new Date() })
	expect(a[1]).toEqual(
		'padding: 2px; line-height: 1rem;background: #96005a;border: 1px solid #76003a;color: #ffffff;'
	)
	expect(a[1]).toEqual(b[1])
})

test('support color template', () => {
	const actual = cssFormatter({
		id: 'color-template',
		level: logLevels.critical,
		args: ['%c SomeColored Text %c AnotherColor', 'color:blue;', 'color:red;', 'not colored'],
		timestamp: new Date()
	})
	a.satisfies(actual, [
		'%c color-template %c SomeColored Text %c AnotherColor',
		'padding: 2px; line-height: 1rem;background: #96005a;border: 1px solid #76003a;color: #ffffff;',
		'color:blue;',
		'color:red;',
		'not colored',
		anything
	])
})

it('can customize the default style', () => {
	const cssFormatter = createCssFormatter({ style: 'padding:1px;' })
	const a = cssFormatter({ id: 'log', level: logLevels.critical, args: ['a'], timestamp: new Date() })
	expect(a[1]).toEqual('padding:1px;background: #96005a;border: 1px solid #76003a;color: #ffffff;')
})
