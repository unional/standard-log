# standard-log-syslog

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Github NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

syslog plugin for [`standard-log`](https://github.com/unional/standard-log)

## Usage

```ts
import { createSyslogLogReporter } from 'standard-log-syslog'
import { config, getLogger } from 'standard-log'

const reporter = createSyslogLogReporter()
config({ reporters: [reporter]})

const log = getLogger('some logger')
log.info('some log')
```

[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-syslog.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-syslog
[github-action-url]: https://github.com/unional/standard-log/actions
[github-nodejs]: https://github.com/unional/standard-log/workflows/release/badge.svg
[npm-image]: https://img.shields.io/npm/v/standard-log-syslog.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-syslog
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
