import type { Stream } from 'node:stream'
import { testType } from 'type-plus'
import { test } from 'vitest'
import type { LogFormatter, LogReporter } from './types.js'

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
	testType.canAssign<LogFormatter<Stream>, LogReporter<string>['formatter']>(false)
})
