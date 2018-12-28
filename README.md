# @unional/logging

![unstable][unstable-image]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

A logging library that doesn't suck.

This library builds on top of [`aurelia-logging`](https://github.com/aurelia/logging).

You can use any Aurelia log appender with this library.
e.g.:

- [`aurelia-logging-color`](https://github.com/unional/aurelia-logging-color)
- [`aurelia-logging-memory`](https://github.com/unional/aurelia-logging-memory)
- [`aurelia-logging-console`](https://github.com/aurelia/logging-console)

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
[greenkeeper-image]: https://badges.greenkeeper.io/unional/logging.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/@unional/logging.svg?style=flat
[npm-url]: https://npmjs.org/package/@unional/logging
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[unstable-image]: https://img.shields.io/badge/stability-unstable-yellow.svg
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
