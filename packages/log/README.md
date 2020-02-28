# standard-log

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

`standard-log` is a powerful and extensible logging library.

## Key features

- create multiple loggers for different part of your application.
- provide multiple log levels out of the box.
- add custom log levels.
- global and local log level control.
- send logs to multiple reporters, e.g. console, file, memory, or remote service.
- custom formatting and filtering for each reporter.
- config tempering protection during production

## Usage

To use `standard-log`, simply create your logger and log away:

```ts
import { getLogger } from 'standard-log'

const log = getLogger('my-app')

log.error('error')
log.warn('warn')
// by default debug() and info() will not be printed
// because production mode defaults log level to `warn`
log.info('info')
log.debug('debug')
```

![rendering-example](images/2019-08-08-23-40-05.png)

(above is logged with `standard-log-color` installed)

You can configure a logger by doing `getLogger(id, options)`:

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

`standard-log` log level defaults to `logLevels.warn`.
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

## Browser usage

The package comes with a pre-bundled file under `dist`.
To use it, you also need to load [`global-store`](https://github.com/unional/global-store)

If you are building a library and bundle it, make sure you mark `global-store` as externals.
You can check out [`global-store`](https://github.com/unional/global-store) for more information.

[circleci-image]: https://circleci.com/gh/unional/standard-log/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/standard-log/tree/master
[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[coveralls-image]: https://coveralls.io/repos/github/unional/standard-log/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log
[npm-image]: https://img.shields.io/npm/v/standard-log.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log
[travis-image]: https://travis-ci.com/unional/standard-log.svg?branch=master
[travis-url]: https://travis-ci.com/unional/standard-log?branch=master
