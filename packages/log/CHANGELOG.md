# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 5.1.1 (2021-03-13)

**Note:** Version bump only for package standard-log





# 5.1.0 (2021-02-24)


### Features

* add logger.write(entry) ([28fe6c9](https://github.com/unional/standard-log/commit/28fe6c955b7c5dd3a13bef5f3276b7f4641b2d1f))





# 5.0.0 (2021-02-24)


### Features

* return result in captureLogs() ([#97](https://github.com/unional/standard-log/issues/97)) ([3f457c3](https://github.com/unional/standard-log/commit/3f457c37a685435a0d20802bb0be33565e58ba20))


### BREAKING CHANGES

* return signagure of captureLogs changed

* chore: update deps





## 4.1.8 (2020-12-19)


### Bug Fixes

* **color:** remove isBrowser and use browser field ([9a468e8](https://github.com/unional/standard-log/commit/9a468e8fb696be680138e707b050b38b4bbb2344))





## 4.1.7 (2020-12-16)


### Bug Fixes

* **syslog:** distribute src to fix source map ([65d1a83](https://github.com/unional/standard-log/commit/65d1a83098bb7c590a88899a828698c661485572))





## 4.1.6 (2020-10-28)


### Bug Fixes

* allow @ \ / in id ([#94](https://github.com/unional/standard-log/issues/94)) ([5684a0e](https://github.com/unional/standard-log/commit/5684a0e43d7dbb5956b3652d87fccee0e638da06))





## 4.1.5 (2020-10-28)


### Bug Fixes

* upgrade dependencies ([#93](https://github.com/unional/standard-log/issues/93)) ([0afc399](https://github.com/unional/standard-log/commit/0afc39942b74e1b2dd551e25b74cdd00739e0416))





## 4.1.4 (2020-08-30)

**Note:** Version bump only for package standard-log





## 4.1.3 (2020-08-30)


### Bug Fixes

* store initializer ([#92](https://github.com/unional/standard-log/issues/92)) ([aedefd3](https://github.com/unional/standard-log/commit/aedefd37ab90baddd540e728fb3d60be7d539abf))





## 4.1.2 (2020-03-07)

**Note:** Version bump only for package standard-log





## 4.1.1 (2020-03-07)

**Note:** Version bump only for package standard-log





# [4.1.0](https://github.com/unional/standard-log/compare/standard-log@4.0.3...standard-log@4.1.0) (2020-03-01)


### Bug Fixes

* default log level to warn ([fe03b18](https://github.com/unional/standard-log/commit/fe03b18788181fc5269dd64250baa6e0ac24a24a))
* default logLevel to info ([391b973](https://github.com/unional/standard-log/commit/391b973d504742232786c5266e80fa51bcba7f27))


### Features

* add captureLogs() ([154afe9](https://github.com/unional/standard-log/commit/154afe9efd6a85eefe0d9c3e416e75990fb8c920))





## [4.0.3](https://github.com/unional/standard-log/compare/standard-log@4.0.2...standard-log@4.0.3) (2020-01-08)


### Bug Fixes

* **color:** add tslib ([ac594d5](https://github.com/unional/standard-log/commit/ac594d54d9a5e12752cd18ff4e7a4f77d9e6188d))
* add sideEffects flag ([95ae4dc](https://github.com/unional/standard-log/commit/95ae4dc056bfbf552a645b681182d08cf56ca0b1))





## [4.0.2](https://github.com/unional/standard-log/compare/standard-log@4.0.1...standard-log@4.0.2) (2019-12-29)


### Bug Fixes

* **package:** update iso-error to version 3.1.3 ([26cf5a8](https://github.com/unional/standard-log/commit/26cf5a8)), closes [#58](https://github.com/unional/standard-log/issues/58)





## [4.0.1](https://github.com/unional/standard-log/compare/standard-log@4.0.0...standard-log@4.0.1) (2019-12-26)


### Bug Fixes

* bump store version ([b8a547f](https://github.com/unional/standard-log/commit/b8a547f))





# [4.0.0](https://github.com/unional/standard-log/compare/standard-log@3.4.0...standard-log@4.0.0) (2019-11-16)


### Bug Fixes

* make logger id and methods readonly ([4171946](https://github.com/unional/standard-log/commit/4171946))


### Features

* **log:** add writeTo option ([d57ee46](https://github.com/unional/standard-log/commit/d57ee46))


### BREAKING CHANGES

* **log:** `getLogger()` signature changed

`getLogger(id, level?)` is changed to `getLogger(id, options?)`.





# [3.4.0](https://github.com/unional/standard-log/compare/standard-log@3.3.0...standard-log@3.4.0) (2019-10-24)


### Bug Fixes

* change isLocked() to getter ([3e24898](https://github.com/unional/standard-log/commit/3e24898))


### Features

* add config.isLocked() ([c9f7a90](https://github.com/unional/standard-log/commit/c9f7a90))





# [3.3.0](https://github.com/unional/standard-log/compare/standard-log@3.2.2...standard-log@3.3.0) (2019-10-24)


### Features

* add logLevels ([2fdba1a](https://github.com/unional/standard-log/commit/2fdba1a))





## [3.2.2](https://github.com/unional/standard-log/compare/standard-log@3.2.1...standard-log@3.2.2) (2019-10-24)


### Bug Fixes

* use setImmediate over setTimeout when available ([63b0795](https://github.com/unional/standard-log/commit/63b0795))





## [3.2.1](https://github.com/unional/standard-log/compare/standard-log@3.2.0...standard-log@3.2.1) (2019-10-24)


### Bug Fixes

* add hasConsoleReporter() ([f696878](https://github.com/unional/standard-log/commit/f696878))





# [3.2.0](https://github.com/unional/standard-log/compare/standard-log@3.1.3...standard-log@3.2.0) (2019-10-24)


### Features

* only use one console reporter ([7427dba](https://github.com/unional/standard-log/commit/7427dba))





## [3.1.3](https://github.com/unional/standard-log/compare/standard-log@3.1.2...standard-log@3.1.3) (2019-08-21)

**Note:** Version bump only for package standard-log





## [3.1.2](https://github.com/unional/standard-log/compare/standard-log@3.1.1...standard-log@3.1.2) (2019-08-10)


### Bug Fixes

* expose shouldLog again ([777d257](https://github.com/unional/standard-log/commit/777d257))





## [3.1.1](https://github.com/unional/standard-log/compare/standard-log@3.1.0...standard-log@3.1.1) (2019-08-10)


### Bug Fixes

* remove spec files from package ([cae7eb7](https://github.com/unional/standard-log/commit/cae7eb7))





# [3.1.0](https://github.com/unional/standard-log/compare/standard-log@3.0.0...standard-log@3.1.0) (2019-08-09)


### Features

* **log:** remove setimmediate to reduce size ([9f54f58](https://github.com/unional/standard-log/commit/9f54f58))





# [3.0.0](https://github.com/unional/standard-log/compare/standard-log@2.1.0...standard-log@3.0.0) (2019-08-09)


### Bug Fixes

* **log:** add global-store as peerDeps ([c49da80](https://github.com/unional/standard-log/commit/c49da80))
* **log:** set bundle target to es5 ([bab5359](https://github.com/unional/standard-log/commit/bab5359))


### Features

* add addLogReporter and co. back ([4f4df6f](https://github.com/unional/standard-log/commit/4f4df6f))
* add formatter and filter for console and memory ([0bc4800](https://github.com/unional/standard-log/commit/0bc4800))
* make configOptions optional ([88b8372](https://github.com/unional/standard-log/commit/88b8372))
* rename modes ([0133d9f](https://github.com/unional/standard-log/commit/0133d9f))


### BREAKING CHANGES

* modes are renamed

`prod` => `production`
'devel` => `development`





# [2.1.0](https://github.com/unional/standard-log/compare/standard-log@2.0.3...standard-log@2.1.0) (2019-08-08)


### Bug Fixes

* getDefaultReporter supports browser ([bd5bf0c](https://github.com/unional/standard-log/commit/bd5bf0c))
* remove addLogReporter ([8dca328](https://github.com/unional/standard-log/commit/8dca328))


### Features

* **log:** remove isBrowser ([e7ff262](https://github.com/unional/standard-log/commit/e7ff262))
* remove core again ([5e1f021](https://github.com/unional/standard-log/commit/5e1f021))





## [2.0.3](https://github.com/unional/standard-log/compare/standard-log@2.0.2...standard-log@2.0.3) (2019-07-29)


### Bug Fixes

* **log:** initialize store properly with new core ([78f6f0d](https://github.com/unional/standard-log/commit/78f6f0d))





## [2.0.2](https://github.com/unional/standard-log/compare/standard-log@2.0.1...standard-log@2.0.2) (2019-07-29)


### Bug Fixes

* move code to @standard-log/core ([#16](https://github.com/unional/standard-log/issues/16)) ([0c769f8](https://github.com/unional/standard-log/commit/0c769f8))





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
