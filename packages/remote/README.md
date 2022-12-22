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

## Securty

Note that logs sent from browser can be intercept an potentially be modified through man-in-the-middle.
To mitigate the risk, you can:

1. Encrypt the message using `formatter`.
2. Do not persist these logs or store them with strict space control
3. Treat them as direct inputs, do not trust any message saved.
4. Should not return these logs back to the user.
5. Define convension and strict control of the format of the logs

The raw logs collected should be treated differently then those generated on the server.
They should not be returned to the user in the form of log reports,
or else your application is subject to Log Injection/Forging and related attacks.


[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-remote.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-remote
[npm-image]: https://img.shields.io/npm/v/standard-log-remote.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-remote
[standard-log]: https://github.com/unional/standard-log
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
