# standard-log-color

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Github NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Color console reporter for [`standard-log`](https://github.com/unional/standard-log).

## Installation

```sh
npm install standard-log-color
yarn add standard-log-color
```

## Usage

If installed, this will be used as the default reporter of [`standard-log`](https://github.com/unional/standard-log)

To customize:

```ts
import { config } from 'standard-log'
import { createColorLogReporter } from 'standard-log-color'

config({ reporters: [createColorLogReporter({ ... }), /* other reporters if needed */] })
```

By default, it will use ansi formatter in NodeJS and css formatter in browser.

If you want to change that, or use your own formatter:

```ts
import { createColorLogReporter } from 'standard-log-color'

createColorLogReporter({
  formatter: yourFormatter
})
```

For `createCssLogFormatter()`, you can specify how many colors to use:

```ts
import { createCssLogFormatter } from 'standard-log-color'

createCssLogFormatter({ maxColor: 30 })
```

![CSS example](2019-07-13-17-19-12.png)

You can also add `timestamp`:

```ts
import { createAnsiLogFormatter, createCssLogFormatter } from 'standard-log-color'

createAnsiLogFormatter({ timestamp: 'none' })
createAnsiLogFormatter({ timestamp: 'iso' })
createAnsiLogFormatter({ timestamp: 'elapsed' })

createCssLogFormatter({ timestamp: 'none' })
createCssLogFormatter({ timestamp: 'iso' })
createCssLogFormatter({ timestamp: 'elapsed' })
```

![timestamp example](2019-07-13-17-18-14.png)

[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-color.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-color
[github-action-url]: https://github.com/unional/standard-log/actions
[github-nodejs]: https://github.com/unional/standard-log/workflows/release/badge.svg
[npm-image]: https://img.shields.io/npm/v/standard-log-color.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-color
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
