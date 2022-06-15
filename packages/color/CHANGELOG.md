# Change Log

## 7.0.2

### Patch Changes

- c7bfa46: Update color-map
- Updated dependencies [d186055]
- Updated dependencies [c7bfa46]
  - standard-log@9.1.5

## 7.0.1

### Patch Changes

- 69d60ce: Downgrade output to ES2019
- Updated dependencies [69d60ce]
- Updated dependencies [023ba01]
  - standard-log@9.1.4

## 7.0.0

### Patch Changes

- Updated dependencies [6ed55c4]
  - standard-log@9.1.0

## 6.0.0

### Patch Changes

- Updated dependencies [eca8627]
- Updated dependencies [8c86135]
- Updated dependencies [ecda388]
- Updated dependencies [f2a038e]
  - standard-log@9.0.0

## 5.0.0

### Minor Changes

- 8f78cae: Add ESM support

### Patch Changes

- fe1b4bf: Add sideEffects flag
- 61fd031: Update dependencies.
- f072cf1: Update dependencies
- Updated dependencies [fe1b4bf]
- Updated dependencies [f072cf1]
- Updated dependencies [8f78cae]
- Updated dependencies [61fd031]
  - standard-log@8.0.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0](https://github.com/unional/standard-log/compare/standard-log-color@3.2.4...standard-log-color@4.0.0) (2022-04-04)

### Bug Fixes

- allow making `config()` call during tests ([#131](https://github.com/unional/standard-log/issues/131)) ([52c97dd](https://github.com/unional/standard-log/commit/52c97dde55167f8f34fba09b64e84733f9668f33))

### BREAKING CHANGES

- config behavior changed

while this shouldn't be an issue,
marking this as a breaking change in case this causes any suprises.

## 3.2.4 (2022-01-02)

**Note:** Version bump only for package standard-log-color

## 3.2.3 (2022-01-02)

**Note:** Version bump only for package standard-log-color

## 3.2.2 (2022-01-02)

**Note:** Version bump only for package standard-log-color

## 3.2.1 (2021-05-21)

### Bug Fixes

- update tslib ([#110](https://github.com/unional/standard-log/issues/110)) ([2d7a0d2](https://github.com/unional/standard-log/commit/2d7a0d200d442794d7152aa284a65c00e0840bd7))

# 3.2.0 (2021-05-12)

### Features

- add configForTest() ([#109](https://github.com/unional/standard-log/issues/109)) ([9170b29](https://github.com/unional/standard-log/commit/9170b2976896b5f0bf577480ee72ec3d9b64a836))

## 3.1.3 (2021-04-30)

### Bug Fixes

- diable destructuring ([#108](https://github.com/unional/standard-log/issues/108)) ([664d33a](https://github.com/unional/standard-log/commit/664d33ae3e499b5cde2c1a9d409730a8e38b261f))

## 3.1.2 (2021-04-30)

### Bug Fixes

- support old phantomjs ([#107](https://github.com/unional/standard-log/issues/107)) ([5fee141](https://github.com/unional/standard-log/commit/5fee14132ec3c220f7447c2347223dfee0a0b2b7))

## 3.1.1 (2021-04-29)

### Bug Fixes

- remove arrow function from bundle ([#106](https://github.com/unional/standard-log/issues/106)) ([cc36f64](https://github.com/unional/standard-log/commit/cc36f646b6d2d24ba0a104e9b8861df5c4dc40a4))

# 3.1.0 (2021-04-18)

### Features

- add MemoryReporter.getLogMessageWithLevel() ([5c923d9](https://github.com/unional/standard-log/commit/5c923d971d22aff015d47c0a9317004717ce96a2))

## 3.0.1 (2021-04-17)

**Note:** Version bump only for package standard-log-color

# [3.0.0](https://github.com/unional/standard-log/compare/standard-log-color@2.3.0...standard-log-color@3.0.0) (2021-04-17)

### Bug Fixes

- print log message with pretty object ([#104](https://github.com/unional/standard-log/issues/104)) ([3b6709b](https://github.com/unional/standard-log/commit/3b6709b9dea152989b662755cf41c1503895dd8c))

### BREAKING CHANGES

- elasped -> elapsed

The `TimestampFormat` has fixed the typo from `elasped` to `elapsed`.

# 2.3.0 (2021-03-31)

### Features

- adding getLogMessage() for MemoryLogReporter ([19e08d5](https://github.com/unional/standard-log/commit/19e08d536e46258e7d151f40659f502062696c43))

## 2.2.2 (2021-03-19)

**Note:** Version bump only for package standard-log-color

## 2.2.1 (2021-03-19)

### Bug Fixes

- support case when adding first console reporter ([fda7209](https://github.com/unional/standard-log/commit/fda7209a8f72ea6cf2f8d942ed8c1dd29d3cff69))

# 2.2.0 (2021-03-19)

### Features

- getLogger can specify a custom reporter ([1ba85e5](https://github.com/unional/standard-log/commit/1ba85e51c639de8147a82386473c25b2fcf861ca))

## 2.1.2 (2021-03-19)

### Bug Fixes

- filter should be optional ([#100](https://github.com/unional/standard-log/issues/100)) ([6fa73c2](https://github.com/unional/standard-log/commit/6fa73c24d979061c4b390aab4597688d29953fd8))

## 2.1.1 (2021-03-13)

**Note:** Version bump only for package standard-log-color

# 2.1.0 (2021-02-24)

### Features

- add logger.write(entry) ([28fe6c9](https://github.com/unional/standard-log/commit/28fe6c955b7c5dd3a13bef5f3276b7f4641b2d1f))

# 2.0.0 (2021-02-24)

### Features

- return result in captureLogs() ([#97](https://github.com/unional/standard-log/issues/97)) ([3f457c3](https://github.com/unional/standard-log/commit/3f457c37a685435a0d20802bb0be33565e58ba20))

### BREAKING CHANGES

- return signagure of captureLogs changed

- chore: update deps

## 1.5.25 (2020-12-19)

### Bug Fixes

- **color:** remove isBrowser and use browser field ([9a468e8](https://github.com/unional/standard-log/commit/9a468e8fb696be680138e707b050b38b4bbb2344))

## 1.5.24 (2020-12-16)

### Bug Fixes

- **syslog:** distribute src to fix source map ([65d1a83](https://github.com/unional/standard-log/commit/65d1a83098bb7c590a88899a828698c661485572))

## 1.5.23 (2020-10-28)

### Bug Fixes

- allow @ \ / in id ([#94](https://github.com/unional/standard-log/issues/94)) ([5684a0e](https://github.com/unional/standard-log/commit/5684a0e43d7dbb5956b3652d87fccee0e638da06))

## 1.5.22 (2020-10-28)

### Bug Fixes

- upgrade dependencies ([#93](https://github.com/unional/standard-log/issues/93)) ([0afc399](https://github.com/unional/standard-log/commit/0afc39942b74e1b2dd551e25b74cdd00739e0416))

## 1.5.21 (2020-08-30)

**Note:** Version bump only for package standard-log-color

## 1.5.20 (2020-08-30)

### Bug Fixes

- store initializer ([#92](https://github.com/unional/standard-log/issues/92)) ([aedefd3](https://github.com/unional/standard-log/commit/aedefd37ab90baddd540e728fb3d60be7d539abf))

## 1.5.19 (2020-03-07)

**Note:** Version bump only for package standard-log-color

## 1.5.18 (2020-03-07)

**Note:** Version bump only for package standard-log-color

## [1.5.17](https://github.com/unional/standard-log/compare/standard-log-color@1.5.16...standard-log-color@1.5.17) (2020-03-01)

### Bug Fixes

- default logLevel to info ([391b973](https://github.com/unional/standard-log/commit/391b973d504742232786c5266e80fa51bcba7f27))

## [1.5.16](https://github.com/unional/standard-log/compare/standard-log-color@1.5.15...standard-log-color@1.5.16) (2020-01-08)

### Bug Fixes

- update deps ([14e7064](https://github.com/unional/standard-log/commit/14e7064ede66143a9ebc3ee46d720ea47d4eef07))
- **color:** add tslib ([ac594d5](https://github.com/unional/standard-log/commit/ac594d54d9a5e12752cd18ff4e7a4f77d9e6188d))
- add sideEffects flag ([95ae4dc](https://github.com/unional/standard-log/commit/95ae4dc056bfbf552a645b681182d08cf56ca0b1))

## [1.5.15](https://github.com/unional/standard-log/compare/standard-log-color@1.5.14...standard-log-color@1.5.15) (2019-12-29)

**Note:** Version bump only for package standard-log-color

## [1.5.14](https://github.com/unional/standard-log/compare/standard-log-color@1.5.13...standard-log-color@1.5.14) (2019-12-26)

**Note:** Version bump only for package standard-log-color

## [1.5.13](https://github.com/unional/standard-log/compare/standard-log-color@1.5.12...standard-log-color@1.5.13) (2019-11-16)

### Bug Fixes

- **color:** peerDeps to accept 4.0 ([06a7ddc](https://github.com/unional/standard-log/commit/06a7ddc))

## [1.5.12](https://github.com/unional/standard-log/compare/standard-log-color@1.5.11...standard-log-color@1.5.12) (2019-11-16)

**Note:** Version bump only for package standard-log-color

## [1.5.11](https://github.com/unional/standard-log/compare/standard-log-color@1.5.10...standard-log-color@1.5.11) (2019-10-24)

**Note:** Version bump only for package standard-log-color

## [1.5.10](https://github.com/unional/standard-log/compare/standard-log-color@1.5.9...standard-log-color@1.5.10) (2019-10-24)

**Note:** Version bump only for package standard-log-color

## [1.5.9](https://github.com/unional/standard-log/compare/standard-log-color@1.5.8...standard-log-color@1.5.9) (2019-10-24)

**Note:** Version bump only for package standard-log-color

## [1.5.8](https://github.com/unional/standard-log/compare/standard-log-color@1.5.7...standard-log-color@1.5.8) (2019-10-24)

**Note:** Version bump only for package standard-log-color

## [1.5.7](https://github.com/unional/standard-log/compare/standard-log-color@1.5.6...standard-log-color@1.5.7) (2019-10-24)

**Note:** Version bump only for package standard-log-color

## [1.5.6](https://github.com/unional/standard-log/compare/standard-log-color@1.5.5...standard-log-color@1.5.6) (2019-08-21)

**Note:** Version bump only for package standard-log-color

## [1.5.5](https://github.com/unional/standard-log/compare/standard-log-color@1.5.4...standard-log-color@1.5.5) (2019-08-10)

**Note:** Version bump only for package standard-log-color

## [1.5.4](https://github.com/unional/standard-log/compare/standard-log-color@1.5.3...standard-log-color@1.5.4) (2019-08-10)

**Note:** Version bump only for package standard-log-color

## [1.5.3](https://github.com/unional/standard-log/compare/standard-log-color@1.5.2...standard-log-color@1.5.3) (2019-08-10)

### Bug Fixes

- remove spec files from package ([cae7eb7](https://github.com/unional/standard-log/commit/cae7eb7))

## [1.5.2](https://github.com/unional/standard-log/compare/standard-log-color@1.5.1...standard-log-color@1.5.2) (2019-08-09)

**Note:** Version bump only for package standard-log-color

## [1.5.1](https://github.com/unional/standard-log/compare/standard-log-color@1.5.0...standard-log-color@1.5.1) (2019-08-09)

### Bug Fixes

- **color:** don't need to define id ([8fd5915](https://github.com/unional/standard-log/commit/8fd5915))

# [1.5.0](https://github.com/unional/standard-log/compare/standard-log-color@1.4.6...standard-log-color@1.5.0) (2019-08-08)

### Features

- **log:** remove isBrowser ([e7ff262](https://github.com/unional/standard-log/commit/e7ff262))
- remove core again ([5e1f021](https://github.com/unional/standard-log/commit/5e1f021))

## [1.4.6](https://github.com/unional/standard-log/compare/standard-log-color@1.4.5...standard-log-color@1.4.6) (2019-07-29)

### Bug Fixes

- **color:** not reference standard-log ([70d81f5](https://github.com/unional/standard-log/commit/70d81f5))

## [1.4.5](https://github.com/unional/standard-log/compare/standard-log-color@1.4.4...standard-log-color@1.4.5) (2019-07-29)

**Note:** Version bump only for package standard-log-color

## [1.4.4](https://github.com/unional/standard-log/compare/standard-log-color@1.4.3...standard-log-color@1.4.4) (2019-07-29)

### Bug Fixes

- move code to @standard-log/core ([#16](https://github.com/unional/standard-log/issues/16)) ([0c769f8](https://github.com/unional/standard-log/commit/0c769f8))

## [1.4.3](https://github.com/unional/standard-log/compare/standard-log-color@1.4.2...standard-log-color@1.4.3) (2019-07-29)

### Bug Fixes

- **color:** use local isBrowser ([#15](https://github.com/unional/standard-log/issues/15)) ([343b3cf](https://github.com/unional/standard-log/commit/343b3cf))

## [1.4.2](https://github.com/unional/standard-log/compare/standard-log-color@1.4.1...standard-log-color@1.4.2) (2019-07-29)

**Note:** Version bump only for package standard-log-color

## [1.4.1](https://github.com/unional/standard-log/compare/standard-log-color@1.4.0...standard-log-color@1.4.1) (2019-07-28)

### Bug Fixes

- udpate peerDeps to 2.0.0 ([83ba5d2](https://github.com/unional/standard-log/commit/83ba5d2))

# 1.4.0 (2019-07-28)

### Bug Fixes

- **memory:** add aurelia-logging back as dependency ([5987bb5](https://github.com/unional/standard-log/commit/5987bb5))
- console log for debug before NodeJS@9.3 ([#39](https://github.com/unional/standard-log/issues/39)) ([305a92f](https://github.com/unional/standard-log/commit/305a92f))
- preversion script ([cab5195](https://github.com/unional/standard-log/commit/cab5195))
- remove declaration from bundle folder ([6629661](https://github.com/unional/standard-log/commit/6629661))
- repass all tests ([9aa8a68](https://github.com/unional/standard-log/commit/9aa8a68))

### Features

- **color:** decouple form `Logger` ([2f48976](https://github.com/unional/standard-log/commit/2f48976))
- add aurelia-logging-file ([#43](https://github.com/unional/standard-log/issues/43)) ([2f7a7e8](https://github.com/unional/standard-log/commit/2f7a7e8))
- update aurelia-logging-color to not depend on Logger ([bb07b1b](https://github.com/unional/standard-log/commit/bb07b1b))
- **color:** rename standard-log-console to standard-log-color ([30fa7fb](https://github.com/unional/standard-log/commit/30fa7fb))
- **simple-console:** initial release ([946fd31](https://github.com/unional/standard-log/commit/946fd31))

## [1.3.6](https://github.com/unional/standard-log/compare/standard-log-console@1.3.5...standard-log-console@1.3.6) (2019-07-15)

### Bug Fixes

- **console:** remove semver library ([c7eabed](https://github.com/unional/standard-log/commit/c7eabed))

## [1.3.5](https://github.com/unional/standard-log/compare/standard-log-console@1.3.4...standard-log-console@1.3.5) (2019-07-15)

**Note:** Version bump only for package standard-log-console

## [1.3.4](https://github.com/unional/standard-log/compare/standard-log-console@1.3.3...standard-log-console@1.3.4) (2019-07-15)

**Note:** Version bump only for package standard-log-console

## [1.3.3](https://github.com/unional/standard-log/compare/standard-log-console@1.3.2...standard-log-console@1.3.3) (2019-07-15)

**Note:** Version bump only for package standard-log-console

## [1.3.2](https://github.com/unional/standard-log/compare/standard-log-console@1.3.1...standard-log-console@1.3.2) (2019-07-15)

**Note:** Version bump only for package standard-log-console

## [1.3.1](https://github.com/unional/standard-log/compare/standard-log-console@1.3.0...standard-log-console@1.3.1) (2019-07-15)

**Note:** Version bump only for package standard-log-console

# [1.3.0](https://github.com/unional/standard-log/compare/standard-log-console@1.2.2...standard-log-console@1.3.0) (2019-07-14)

### Features

- **log:** export LogReporterOptions ([#7](https://github.com/unional/standard-log/issues/7)) ([32122f0](https://github.com/unional/standard-log/commit/32122f0))

## [1.2.2](https://github.com/unional/standard-log/compare/standard-log-console@1.2.1...standard-log-console@1.2.2) (2019-07-14)

**Note:** Version bump only for package standard-log-console

## [1.2.1](https://github.com/unional/standard-log/compare/standard-log-console@1.2.0...standard-log-console@1.2.1) (2019-07-14)

### Bug Fixes

- include libm in distribution ([f844b9c](https://github.com/unional/standard-log/commit/f844b9c))

# 1.2.0 (2019-07-14)

### Bug Fixes

- **console:** clean up console options ([fb3020f](https://github.com/unional/standard-log/commit/fb3020f))
- **console:** polyfill console ([5367fe1](https://github.com/unional/standard-log/commit/5367fe1))
- use object.assign instead of spread for NodeJS6 ([#2](https://github.com/unional/standard-log/issues/2)) ([26ef224](https://github.com/unional/standard-log/commit/26ef224))

### Features

- **console:** add ConsoleLogFormatter type ([4460dd1](https://github.com/unional/standard-log/commit/4460dd1))
- **console:** expose createTimestampFormatter() ([91f3561](https://github.com/unional/standard-log/commit/91f3561))
- **console:** expose wrapAnsi and constants ([b3abc07](https://github.com/unional/standard-log/commit/b3abc07))
- **console:** move plainFormatter to core ([242d37b](https://github.com/unional/standard-log/commit/242d37b))
- **console:** remove dead types ([0253226](https://github.com/unional/standard-log/commit/0253226))
- **console:** remove default cssFormatter. ([4799308](https://github.com/unional/standard-log/commit/4799308))
- **core:** move isBrowser ([dc36f47](https://github.com/unional/standard-log/commit/dc36f47))
- **core:** remove LogReporter.filter ([2abf9b9](https://github.com/unional/standard-log/commit/2abf9b9))
