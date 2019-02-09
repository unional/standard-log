# @unional/logging

[![Greenkeeper badge](https://badges.greenkeeper.io/unional/logging.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

A logging library that doesn't suck.

This library was based on [`aurelia-logging`](https://github.com/aurelia/logging).
In 1.0, the coupling is mostly eliminated and the only thing shared is the `logLevel` and the general design.

You can use any of the following appender with this library:

- [`aurelia-logging-simple-console](https://github.com/unional/logging/tree/master/packages/simple-console) (this is the default appender)
- [`aurelia-logging-color`](https://github.com/unional/logging/tree/master/packages/color)
- [`aurelia-logging-file`](https://github.com/unional/logging/tree/master/packages/file)
- [`aurelia-logging-memory`](https://github.com/unional/logging/tree/master/packages/memory)
- [`aurelia-logging-console`](https://github.com/aurelia/logging-console) (pending on this [PR](https://github.com/aurelia/logging-console/pull/17))

## Usage

```ts
import { getLogger } from '@unional/logging'

const log = getLogger('mylogger')

log.error(...)
log.warn(...)
log.info(...)
log.debug(...)

log.onError(log => log(getLogMessageThatIsTimeConsumingToCreate()))
log.onWarn(...)
log.onInfo(...)
log.onDebug(...)

// or
log.onError(() => getLogMessageThatIsTimeConsumingToCreate())

function getLogMessageThatIsTimeConsumingToCreate() {
  ...
}
```

[circleci-image]: https://circleci.com/gh/unional/logging/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/logging/tree/master
[codecov-image]: https://codecov.io/gh/unional/logging/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/logging
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
[downloads-image]: https://img.shields.io/npm/dm/@unional/logging.svg?style=flat
[downloads-url]: https://npmjs.org/package/@unional/logging
[npm-image]: https://img.shields.io/npm/v/@unional/logging.svg?style=flat
[npm-url]: https://npmjs.org/package/@unional/logging
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
