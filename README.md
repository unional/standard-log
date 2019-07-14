# standard-log

[![Greenkeeper badge](https://badges.greenkeeper.io/unional/standard-log.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

This is the repository for [`standard-log`](https://github.com/unional/standard-log)

`standard-log` is a flexible logging library allows you to handle log in any possible ways.

## Usage

To use `standard-log`, simply create your logger and log away:
```ts
import { getLogger } from 'standard-log'

const log = getLogger('my-app')

log.debug('debug')
log.info('info')
log.warn('warn')
log.error('error')
```

### Mode

By default, `standard-log` runs in production mode.
You can change it programmatically:

```ts
import { config } from 'standard-log'

config({ mode: 'prod' }) // or 'devel'
```

or by setting the environment variable `STANDARD_LOG` to `prod` or `devel`.

Here are some differences between production mode and development mode:

- log level defaults to `warn` in production and `debug` in development.
- `config()` can only called once during production.

### Log Level

`standard-log` has many log level out of the box:

```ts
import { getLogger } from 'standard-log'

const log = getLogger('x')
log.none('msg')
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

When sending the logs to console, they are mapped to `info`, `warn`, `error`, and `debug` based on severity.

You can also add your own levels:

```ts
import { config, getLogger, logLevel } from 'standard-log'

config({
  customLevels: {
    'silly': logLevel.debug + 1
  }
})

const log = getLogger<'silly'>('custom')
log.silly('oh silly')
```

### Reporters

Besides printing the logs to console,
you can use different reporters to save the logs in memory, file, service, or others.

```ts
import { config, createConsoleLogReporter } from 'standard-log'
import { createMemoryLogReporter } from 'standard-log-memory'

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
  filter: (entry) => entry.args.some(arg => arg === 'secret')
})
```

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
[travis-image]: https://img.shields.io/travis/unional/standard-log/master.svg?style=flat
[travis-url]: https://travis-ci.com/unional/standard-log?branch=master
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
