# aurelia-logging-file

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

File based appenders for `aurelia-logging` and `@unional/logging`.

## Usage

```ts
import { addAppender } from 'aurelia-logging' // or `@unional/logging`
import { FileAppender } from 'aurelia-logging-file'

// All logs are appended to the same file.
const file = new FileAppender('filename.log')
addAppender(file)

// log away...
```

You can change the format of your messages:

```ts
import { stringifyLogLevel } from 'aurelia-logging-file'

new FileAppender('filename.log', { format: '{id}({LEVEL}): {messages}}' })
new FileAppender('filename.log', {
  format: (id, level, messages) => `${id}(${stringifyLogLevel(level)}): ${messages}`
})
```

- `{ID}` will print logger id in upper case.
- `{LEVEL}` will print log level in upper case.

[npm-image]: https://img.shields.io/npm/v/aurelia-logging-file.svg?style=flat
[npm-url]: https://npmjs.org/package/aurelia-logging-file
[downloads-image]: https://img.shields.io/npm/dm/aurelia-logging-file.svg?style=flat
[downloads-url]: https://npmjs.org/package/aurelia-logging-file
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
