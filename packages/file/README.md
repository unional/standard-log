# aurelia-logging-file

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

File based appenders for `aurelia-logging` and `@unional/logging`.

## Usage

```js
import { addAppender } from 'aurelia-logging' // or `@unional/logging`
import { FileAppender, MultifilesAppender } from 'aurelia-logging-file'

// All logs are appended to the same file.
const file = new FileAppender('filename.log')
addAppender(file)

// Logs from each logger will be saved in their own file.
const multifile = new MultifilesAppender('.')

// log away...
```

[npm-image]: https://img.shields.io/npm/v/aurelia-logging-file.svg?style=flat
[npm-url]: https://npmjs.org/package/aurelia-logging-file
[downloads-image]: https://img.shields.io/npm/dm/aurelia-logging-file.svg?style=flat
[downloads-url]: https://npmjs.org/package/aurelia-logging-file
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
