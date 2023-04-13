import { Stream } from 'stream'
import { assertType, CanAssign } from 'type-plus'
import { LogFormatter, LogReporter } from './types.js'

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
	assertType.isFalse(false as CanAssign<LogFormatter<Stream>, LogReporter<string>['formatter']>)
})
