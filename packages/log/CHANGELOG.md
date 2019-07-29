# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/unional/standard-log/compare/standard-log@2.0.0...standard-log@2.0.1) (2019-07-29)


### Bug Fixes

* in test mode log writing are sync ([#14](https://github.com/unional/standard-log/issues/14)) ([25529f9](https://github.com/unional/standard-log/commit/25529f9))





# [2.0.0](https://github.com/unional/standard-log/compare/standard-log@1.5.2...standard-log@2.0.0) (2019-07-28)


### Bug Fixes

* nodejs8 does not support catch without exception ([e89d422](https://github.com/unional/standard-log/commit/e89d422))
* **log:** look for `standard-log-color` ([43219a2](https://github.com/unional/standard-log/commit/43219a2))
* **log:** rename default reporter back to 'console' ([fa945d5](https://github.com/unional/standard-log/commit/fa945d5))
* **log:** tricks webpack to not bundle console ([632d7ba](https://github.com/unional/standard-log/commit/632d7ba))
* queue the logEntry ([28dab98](https://github.com/unional/standard-log/commit/28dab98))
* simplify writeToReporters ([#11](https://github.com/unional/standard-log/issues/11)) ([93431f7](https://github.com/unional/standard-log/commit/93431f7))
* update to use beta version of global-store ([9189dce](https://github.com/unional/standard-log/commit/9189dce))


### Features

* **console:** depends on standard-log ([01fa52d](https://github.com/unional/standard-log/commit/01fa52d))
* **log:** absorb standard-log-memory into standard-log ([ebbd5dc](https://github.com/unional/standard-log/commit/ebbd5dc))
* **log:** export custom level api ([ca43394](https://github.com/unional/standard-log/commit/ca43394))
* **log:** move isBrowser to log ([44a8b1c](https://github.com/unional/standard-log/commit/44a8b1c))
* **log:** move logLevel to log package ([ec5595f](https://github.com/unional/standard-log/commit/ec5595f))
* **log:** move plainFormatter from core to log ([5235bbc](https://github.com/unional/standard-log/commit/5235bbc))
* **log:** move timestamp formatter form console to log ([c136fb1](https://github.com/unional/standard-log/commit/c136fb1))
* **log:** move toLogLevelDisplay from core to log as formatLogLevel() ([6203f7d](https://github.com/unional/standard-log/commit/6203f7d))
* **log:** provide simple console reporter ([46ab1cf](https://github.com/unional/standard-log/commit/46ab1cf))
* log out-of-band ([951e01b](https://github.com/unional/standard-log/commit/951e01b))
* **log:** rename Console* to ConsoleLog* ([a0b51cb](https://github.com/unional/standard-log/commit/a0b51cb))


### BREAKING CHANGES

* **log:** api change





## [1.5.2](https://github.com/unional/standard-log/compare/standard-log@1.5.1...standard-log@1.5.2) (2019-07-16)


### Bug Fixes

* fix readme example ([2a9158e](https://github.com/unional/standard-log/commit/2a9158e))





## [1.5.1](https://github.com/unional/standard-log/compare/standard-log@1.5.0...standard-log@1.5.1) (2019-07-15)


### Bug Fixes

* **log:** mark global-store as externals ([19d1a23](https://github.com/unional/standard-log/commit/19d1a23))





# [1.5.0](https://github.com/unional/standard-log/compare/standard-log@1.4.1...standard-log@1.5.0) (2019-07-15)


### Features

* on() supports log level name ([269839d](https://github.com/unional/standard-log/commit/269839d))





## [1.4.1](https://github.com/unional/standard-log/compare/standard-log@1.4.0...standard-log@1.4.1) (2019-07-15)


### Bug Fixes

* **log:** shouldLog() params name. ([07d7e82](https://github.com/unional/standard-log/commit/07d7e82))





# [1.4.0](https://github.com/unional/standard-log/compare/standard-log@1.3.0...standard-log@1.4.0) (2019-07-15)


### Features

* **log:** export shouldLog() helper function ([f07a559](https://github.com/unional/standard-log/commit/f07a559))





# [1.3.0](https://github.com/unional/standard-log/compare/standard-log@1.2.1...standard-log@1.3.0) (2019-07-15)


### Features

* **core:** add test mode ([12a3e61](https://github.com/unional/standard-log/commit/12a3e61))





## [1.2.1](https://github.com/unional/standard-log/compare/standard-log@1.2.0...standard-log@1.2.1) (2019-07-15)


### Bug Fixes

* **log:** getLogger to properly reutrn logger with methods ([90f5e01](https://github.com/unional/standard-log/commit/90f5e01))





# [1.2.0](https://github.com/unional/standard-log/compare/standard-log@1.1.1...standard-log@1.2.0) (2019-07-15)


### Bug Fixes

* **log:** honor logLevel ([d11c8da](https://github.com/unional/standard-log/commit/d11c8da))


### Features

* add logger local level ([f0bc937](https://github.com/unional/standard-log/commit/f0bc937))
* add logger.on() ([bbd5eba](https://github.com/unional/standard-log/commit/bbd5eba))
* add setLogLevels ([90b3a20](https://github.com/unional/standard-log/commit/90b3a20))





## [1.1.1](https://github.com/unional/standard-log/compare/standard-log@1.1.0...standard-log@1.1.1) (2019-07-15)

**Note:** Version bump only for package standard-log





# [1.1.0](https://github.com/unional/standard-log/compare/standard-log@1.0.2...standard-log@1.1.0) (2019-07-14)


### Features

* **log:** export LogReporterOptions ([#7](https://github.com/unional/standard-log/issues/7)) ([32122f0](https://github.com/unional/standard-log/commit/32122f0))





## [1.0.2](https://github.com/unional/standard-log/compare/standard-log@1.0.1...standard-log@1.0.2) (2019-07-14)

**Note:** Version bump only for package standard-log





## [1.0.1](https://github.com/unional/standard-log/compare/standard-log@0.1.0...standard-log@1.0.1) (2019-07-14)


### Bug Fixes

* include libm in distribution ([f844b9c](https://github.com/unional/standard-log/commit/f844b9c))





# 0.1.0 (2019-07-14)


### Bug Fixes

* use object.assign instead of spread for NodeJS6 ([#2](https://github.com/unional/standard-log/issues/2)) ([26ef224](https://github.com/unional/standard-log/commit/26ef224))

### Features

* prevent calling config() twice ([dc2bfb8](https://github.com/unional/standard-log/commit/dc2bfb8))
* **core:** rename inc() to count() ([40bee67](https://github.com/unional/standard-log/commit/40bee67))
* **log:** clean and add RuntimeMode ([d292342](https://github.com/unional/standard-log/commit/d292342))
* **log:** improve getLogger type ([2f2495e](https://github.com/unional/standard-log/commit/2f2495e))
