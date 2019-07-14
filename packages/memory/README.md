# standard-log-memory

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

Provides a memory log reporter for [`standard-log`](https://github.com/unional/standard-log)

## Usage

```ts
import { createMemoryLogReporter, logEntriesToString } from 'standard-log-memory'
import { config, getLogger } from 'standard-log'

const reporter = createMemoryLogReporter()
config({ reporters: [reporter]})

const log = getLogger('some logger')
log.info('some log')

console.info(reporter.logs) // contains all log entries
console.info(logEntriesToString(reporter.logs)) // render log entries as string using `plainFormatter`
```

You can supply a `formatter` to pre-process the log entries before they are saved.
For example, you can use it to censor sensitive information.

```ts
import { createMemoryLogReporter } from 'standard-log-memory'

const reporter = createMemoryLogReporter({
  formatter: (entry) => ({
    ...entry,
    args: entry.args(removeSensitiveInformation)
  })
})

function removeSensitiveInformation(values: any[]) {
  return /* your implementation */
}
```

[circleci-image]: https://circleci.com/gh/unional/standard-log/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/standard-log/tree/master
[codecov-image]: https://codecov.io/gh/unional/standard-log/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/standard-log
[coveralls-image]: https://coveralls.io/repos/github/unional/standard-log/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/standard-log
[downloads-image]: https://img.shields.io/npm/dm/standard-log-memory.svg?style=flat
[downloads-url]: https://npmjs.org/package/standard-log-memory
[npm-image]: https://img.shields.io/npm/v/standard-log-memory.svg?style=flat
[npm-url]: https://www.npmjs.com/package/standard-log-memory
[travis-image]: https://travis-ci.com/unional/standard-log.svg?branch=master
[travis-url]: https://travis-ci.com/unional/standard-log?branch=master
