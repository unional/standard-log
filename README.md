# @unional/logging

[![unstable][unstable-image]][unstable-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/unional/logging.svg)](https://greenkeeper.io/)

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

log.onDebug(log => log(getLogMessageThatIsTimeConsumingToCreate()))

function getLogMessageThatIsTimeConsumingToCreate() {
  ...
}
```

[unstable-image]: http://badges.github.io/stability-badges/dist/unstable.svg
[unstable-url]: http://github.com/badges/stability-badges
[npm-image]: https://img.shields.io/npm/v/@unional/logging.svg?style=flat
[npm-url]: https://npmjs.org/package/@unional/logging
[downloads-image]: https://img.shields.io/npm/dm/@unional/logging.svg?style=flat
[downloads-url]: https://npmjs.org/package/@unional/logging
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
