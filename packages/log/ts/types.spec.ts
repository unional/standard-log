import type { Stream } from 'stream'
import { assertType, type CanAssign } from 'type-plus'
import type { LogFormatter, LogReporter } from './types.js'

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
	assertType.isFalse(false as CanAssign<LogFormatter<Stream>, LogReporter<string>['formatter']>)
})
