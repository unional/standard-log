# standard-log

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![GitHub NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

[`standard-log`] is a powerful and extensible logging library.

## New in 9.0

[`standard-log`] 9.0 is a trimmed down version that focus more on security and support the micro-app paradigm.

The key changes are:

- No side effects: application calling `createStandardLog()` gets a completely enclosed log system.
- Immutable: after the log system can be configured when calling `createStandardLog()`.\
  But after that, the system is immutable and cannot be changed.\

For the full list of changes, please check the [change log](./CHANGELOG.md).

## Key features

- Support micro-app with isolated log system.
- Create multiple loggers for different part of your application.
- Provide multiple log levels out of the box.
- Support custom log levels.
- Three levels of log level controls: log system, logger, and log method.
- Send logs to multiple reporters, e.g. console, file, memory, or remote service.
- Custom formatting and filtering for each reporter.
- Security focus. After the system is created, it cannot be changed.
- Compliant with the [`just-func`] paradigm.

## Usage

To use `standard-log`, you first create a new log system.

```ts
import { createStandardLog } from 'standard-log'

const standardLog = createStandarLog(/* options */)

const log = standardLog.getLogger(['my-app'])

log.error('error message')
log.warn('warn message')
log.info('info message')
// by default debug() will not be printed
// because production mode defaults log level to `info`
log.debug('debug message')
```

![Rendering example](images/2022-06-10-19-21-48.png)

(above is logged with `standard-log-color`)

You can configure a logger by doing `getLogger([id, options])`:

`options.level: number`:

Log level of this logger.

`options.writeTo: string | RegExp | ((reporterId: string) => boolean)`:

Only log to specific reporter(s).

### Mode

By default, `standard-log` runs in production mode.
You can change it programmatically:

```ts
import { config } from 'standard-log'

config({ mode: 'production' }) // or 'development', 'test'
```

or by setting the environment variable `STANDARD_LOG`.

`production` mode:

- `config()` can only be called once.
- configuration is protected from tempering.

`development` mode:

- a warning is emitted when calling `config()` or log for the first time.

`test` mode:

- no warning is emitted

### Log Level

`standard-log` log level defaults to `logLevels.info`.
It comes with many log levels out of the box:

```ts
import { getLogger } from 'standard-log'

const log = getLogger('x')
log.emergency('msg')
log.alert('msg')
log.critical('msg')
log.error('msg')
log.warn('msg')
log.notice('msg')
log.info('msg')
log.debug('msg')
log.trace('msg')
log.planck('msg')
```

When sending logs to console, they are mapped to `info`, `warn`, `error`, and `debug` based on severity.

You can also add your own custom levels:

```ts
import { config, getLogger, logLevel } from 'standard-log'

config({
  customLevels: {
    'important': logLevel.warn + 1,
    'silly': logLevel.debug + 1
  }
})

const log = getLogger<'silly' | 'important'>('custom')
log.important('this is an important message')
log.silly('oh silly')
```

### Reporters

Besides printing the logs to console,
you can use different reporters to save the logs in memory, file, service, or others.

```ts
import { config, createConsoleLogReporter, createMemoryLogReporter } from 'standard-log'

config({
  reporters: [createConsoleLogReporter(), createMemoryLogReporter()]
})
```

Some reporters allows you to format the logs and/or filter them.
Using the console log reporter as an example:

```ts
import { createConsoleLogReporter } from 'standard-log'

createConsoleLogReporter({
  formatter: (entry) => [...],
  filter: (entry) => entry.args.every(arg => arg !== 'secret')
})
```

Here are some additional reporters:

- [`standard-log-color`](https://github.com/unional/standard-log/tree/master/packages/color)
- `standard-log-file` (TODO)
- `standard-log-syslog` (TODO)

### Capture Logs

You can temporarily capture logs by `captureLogs()`.
This is useful when you are writing tests.

```ts
import { getLogger, captureLogs } from 'standard-log'
import a from 'assertron'

test('your test', () => {
  function foo() {
    const log = getLogger('foo logger')
    // this log will not be sent to normal reporters
    log.info('some messages')
    return 'miku'
  }
  const log = getLogger('foo logger')
  const [result, logs] = captureLogs(log, foo)

  a.satisfies(logs, [{ args: ['some messages']}])
  a.equals('miku', result)

  // rewriting the logs
  logs.forEach(entry => log.write(entry))
})
```

### Suppress log

You can temporarily suppress logs by `suppressLogs()`.
This allows you to disable downstream logs to reduce log noises.

```ts
import { getLogger, suppressLogs } from 'standard-log'

const log = getLogger('some logger')

suppressLogs(() => log.info('not logged'), log)
```

## Browser usage

The package comes with a pre-bundled file under `dist`.
To use it, you also need to load [`global-store`](https://github.com/unional/global-store)

If you are building a library and bundle it, make sure you mark `global-store` as externals.
You can check out [`global-store`](https://github.com/unional/global-store) for more information.

## testing

During test,
you should configure `standard-log` to `test` mode and use `MemoryReporter` to capture the logs.

```ts
import { config, createMemoryReporter } from 'standard-log'

test('your test', () => {
  const reporter = createMemoryLogReporter()
  config({
    reporters: [reporter],
    mode: 'test'
  })

  // do your thing...

  const messages = reporter.getLogMessage() // or getLogMessageWithLevel()
  // validate the message if you want to
})
```

And to simplify things, you can use the `configForTest()` function:

```ts
import { configForTest } from 'standard-log'

test('your test', () => {
  const { reporter } = configForTest()

  // do your thing...
})
```

[npm-image]: https://img.shields.io/npm/v/standard-log.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log

[github-nodejs]: https://github.com/unional/standard-log/workflows/Node%20CI/badge.svg
[github-action-url]: https://github.com/unional/standard-log/actions
[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log

[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[`just-func`]: https://github.com/justland/just-func-typescript
