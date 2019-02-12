import { Stream } from 'stream';
import { tryAssign, typeAssert } from 'type-plus';
import { LogFormatter, LogReporter } from './interfaces';

test('LogReporter can specify what kind of LogFormatter it accepts', () => {
  let reporter: LogReporter<string> = {} as any

  let byteFormatter: LogFormatter<Stream> = {} as any

  typeAssert.isNever(tryAssign(byteFormatter, reporter.formatter))
})
