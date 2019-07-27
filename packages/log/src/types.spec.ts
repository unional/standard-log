import { Stream } from 'stream';
import { assertType, tryAssign } from 'type-plus';
import { LogReporter } from './LogReporter';
import { LogFormatter } from './types';

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
  let reporter: LogReporter<string> = {} as any

  let byteFormatter: LogFormatter<Stream> = {} as any

  assertType.isNever(tryAssign(byteFormatter, reporter.formatter))
})
