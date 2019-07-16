# standard-log-color

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

Color console reporter for [`standard-log`](https://github.com/unional/standard-log).


## Installation

```sh
yarn add standard-log-color
```

## Usage

If installed, this will be the default reporter of [`standard-log`](https://github.com/unional/standard-log)

If you want to configure `standard-log` to use other reporters programatically,
you can use the `createConsoleReporter()` to create the reporter for console:

```ts
import { config } from 'standard-log'
import { createColorReporter } from 'standard-log-color'

config({ reporters: [createColorReporter(), /* other reporters if needed */] })
```

By default, it will use ansi formatter in NodeJS and css formatter in browser.

If you want to change that, or use your own formatter:

```ts
import { createColorReporter } from 'standard-log-color'

createColorReporter({
  formatter: yourFormatter
})
```

For `createCssFormatter()`, you can specify how many colors to use:

```ts
import { createCssFormatter } from 'standard-log-color'

createCssFormatter({ maxColor: 30 })
```
![](2019-07-13-17-19-12.png)

You can also configure the `timestamp` format:

```ts
import { createAnsiFormatter, createCssFormatter } from 'standard-log-color'

createAnsiFormatter({ timestamp: 'none' })
createAnsiFormatter({ timestamp: 'iso' })
createAnsiFormatter({ timestamp: 'elasped' })

createCssFormatter({ timestamp: 'none' })
createCssFormatter({ timestamp: 'iso' })
createCssFormatter({ timestamp: 'elasped' })
```

![](2019-07-13-17-18-14.png)

[circleci-image]: https://circleci.com/gh/unional/standard-log/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/standard-log/tree/master
[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[coveralls-image]: https://coveralls.io/repos/github/unional/standard-log/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-color.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-color
[npm-image]: https://img.shields.io/npm/v/standard-log-color.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-color
[travis-image]: https://travis-ci.com/unional/standard-log.svg?branch=master
[travis-url]: https://travis-ci.com/unional/standard-log?branch=master
