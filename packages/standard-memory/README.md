# aurelia-logging-memory

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
![badge-size-url]

`MemoryAppender` for `aurelia-logging` and `@unional/logging`.

## Usage

```js
import { addAppender } from 'aurelia-logging' // or `@unional/logging`
import { MemoryAppender, stringifyLogLevel } from 'aurelia-logging-memory'

const appender = new MemoryAppender()
addAppender(appender)

// log away...

// All logs are saved in `appender.logs`
appender.logs.forEach(log => {
  console.log(`${log.id} (${stringifyLogLevel(log.level)}):`, ...log.rest)
})
```

[npm-image]: https://img.shields.io/npm/v/aurelia-logging-memory.svg?style=flat
[npm-url]: https://npmjs.org/package/aurelia-logging-memory
[downloads-image]: https://img.shields.io/npm/dm/aurelia-logging-memory.svg?style=flat
[downloads-url]: https://npmjs.org/package/aurelia-logging-memory
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
[badge-size-url]: http://img.badgesize.io/unional/logging/master/packages/memory/dist/aurelia-logging-memory.js.svg?label=bundle_size
