# standard-log-syslog

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Github NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]
[![Codacy Grade Badge][codacy-grade]][codacy-grade-url]
[![Codacy Coverage Badge][codacy-coverage]][codacy-coverage-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

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

[npm-image]: https://img.shields.io/npm/v/standard-log-syslog.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-syslog
[downloads-image]: https://img.shields.io/npm/dm/standard-log-syslog.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-syslog

[github-nodejs]: https://github.com/unional/standard-log/workflows/Node%20CI/badge.svg
[github-action-url]: https://github.com/unional/standard-log/actions
[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[codacy-grade]: https://api.codacy.com/project/badge/Grade/707f89609508442486050d207ec5bd78
[codacy-grade-url]: https://www.codacy.com/app/homawong/standard-log?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=unional/standard-log&amp;utm_campaign=Badge_Grade
[codacy-coverage]: https://api.codacy.com/project/badge/Coverage/707f89609508442486050d207ec5bd78
[codacy-coverage-url]: https://www.codacy.com/manual/homawong/standard-log?utm_source=github.com&utm_medium=referral&utm_content=unional/standard-log&utm_campaign=Badge_Coverage

[greenkeeper-image]: https://badges.greenkeeper.io/unional/standard-log.svg
[greenkeeper-url]: https://greenkeeper.io/

[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
