import { Stream } from 'stream';
import { assertType, tryAssign } from 'type-plus';
import { LogFormatter, LogReporter } from './types';

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
  const reporter: LogReporter<string> = {} as any

  const byteFormatter: LogFormatter<Stream> = {} as any

  assertType.isNever(tryAssign(byteFormatter, reporter.formatter))
})
