# aurelia-logging-simple-console

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
![badge-size-url]

`SimpleConsoleAppender` for `aurelia-logging` and `@unional/logging`.

## Usage

```js
import { addAppender } from 'aurelia-logging' // or `@unional/logging`
import { SimpleConsoleAppender } from 'aurelia-logging-simple-console'

addAppender(new SimpleConsoleAppender())

// log away...
```

[npm-image]: https://img.shields.io/npm/v/aurelia-logging-simple-console.svg?style=flat
[npm-url]: https://npmjs.org/package/aurelia-logging-simple-console
[downloads-image]: https://img.shields.io/npm/dm/aurelia-logging-simple-console.svg?style=flat
[downloads-url]: https://npmjs.org/package/aurelia-logging-simple-console
[travis-image]: https://img.shields.io/travis/unional/logging/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/logging?branch=master
[coveralls-image]: https://coveralls.io/repos/github/unional/logging/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/logging
[badge-size-url]: http://img.badgesize.io/unional/logging/master/packages/simple-console/dist/aurelia-logging-simple-console.js.svg?label=bundle_size
