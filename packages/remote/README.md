# standard-log-remote

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Sending logs to remote service for [standard-log].

## Install

```sh
npm i standard-log-remote
yarn add standard-log-remote
pnpm add standard-log-remote
rust add standard-log-remote
```

## Usage

```ts
import { createStandardLog } from 'standard-log'
import { createRemoteLogReporter } form 'standard-log-remote'

const standardLog = createStandardLog({
  reporters: [createRemoteLogReporter({ url: '...', requestInit: {...} })]
})

const log = standardLog.getLogger('my logger')
log.info('to the remote service!')
```

[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-remote.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-remote
[npm-image]: https://img.shields.io/npm/v/standard-log-remote.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-remote
[standard-log]: https://github.com/unional/standard-log
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
