# Change Log

## 12.0.2

## 12.0.1

## 12.0.0

## 11.5.2

### Patch Changes

- 4f549d3: add `module` field back and adjust `exports` field.

  Having `module` field allows the package to be used by Webpack 4.

## 11.5.1

## 11.5.0

## 11.4.1

## 11.4.0

## 11.3.0

## 11.2.3

### Patch Changes

- 41be820: Clean up distribution.

  Remove extra files.

- cd7e183: Fix syslog translation

## 11.2.2

### Patch Changes

- 5b25a2d: Update homepage url

## 11.2.1

## 11.2.0

## 11.1.0

## 11.0.1

### Patch Changes

- Updated dependencies [2dd09cd]
  - standard-log@11.0.1

## 11.0.0

### Patch Changes

- Updated dependencies [00ffb1d]
  - standard-log@11.0.0

## 8.0.0

### Patch Changes

- Updated dependencies [0500d1e]
  - standard-log@10.3.0

## 7.0.0

### Patch Changes

- Updated dependencies
  - standard-log@10.2.0

## 6.0.0

### Patch Changes

- Updated dependencies [19dbee6]
  - standard-log@10.0.0

## 5.0.1

### Patch Changes

- 69d60ce: Downgrade output to ES2019
- Updated dependencies [69d60ce]
- Updated dependencies [023ba01]
  - standard-log@9.1.4

## 5.0.0

### Patch Changes

- Updated dependencies [6ed55c4]
  - standard-log@9.1.0

## 4.0.0

### Patch Changes

- Updated dependencies [eca8627]
- Updated dependencies [8c86135]
- Updated dependencies [ecda388]
- Updated dependencies [f2a038e]
  - standard-log@9.0.0

## 3.0.0

### Minor Changes

- 8f78cae: Add ESM support

### Patch Changes

- fe1b4bf: Add sideEffects flag
- Updated dependencies [fe1b4bf]
- Updated dependencies [f072cf1]
- Updated dependencies [8f78cae]
- Updated dependencies [61fd031]
  - standard-log@8.0.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.5.4 (2022-01-02)

**Note:** Version bump only for package standard-log-syslog

## 2.5.3 (2022-01-02)

**Note:** Version bump only for package standard-log-syslog

## 2.5.2 (2022-01-02)

**Note:** Version bump only for package standard-log-syslog

## 2.5.1 (2021-05-21)

### Bug Fixes

- update tslib ([#110](https://github.com/unional/standard-log/issues/110)) ([2d7a0d2](https://github.com/unional/standard-log/commit/2d7a0d200d442794d7152aa284a65c00e0840bd7))

# 2.5.0 (2021-05-12)

### Features

- add configForTest() ([#109](https://github.com/unional/standard-log/issues/109)) ([9170b29](https://github.com/unional/standard-log/commit/9170b2976896b5f0bf577480ee72ec3d9b64a836))

## 2.4.3 (2021-04-30)

### Bug Fixes

- diable destructuring ([#108](https://github.com/unional/standard-log/issues/108)) ([664d33a](https://github.com/unional/standard-log/commit/664d33ae3e499b5cde2c1a9d409730a8e38b261f))

## 2.4.2 (2021-04-30)

### Bug Fixes

- support old phantomjs ([#107](https://github.com/unional/standard-log/issues/107)) ([5fee141](https://github.com/unional/standard-log/commit/5fee14132ec3c220f7447c2347223dfee0a0b2b7))

## 2.4.1 (2021-04-29)

### Bug Fixes

- remove arrow function from bundle ([#106](https://github.com/unional/standard-log/issues/106)) ([cc36f64](https://github.com/unional/standard-log/commit/cc36f646b6d2d24ba0a104e9b8861df5c4dc40a4))

# 2.4.0 (2021-04-18)

### Features

- add MemoryReporter.getLogMessageWithLevel() ([5c923d9](https://github.com/unional/standard-log/commit/5c923d971d22aff015d47c0a9317004717ce96a2))

## 2.3.1 (2021-04-17)

**Note:** Version bump only for package standard-log-syslog

# 2.3.0 (2021-03-31)

### Features

- adding getLogMessage() for MemoryLogReporter ([19e08d5](https://github.com/unional/standard-log/commit/19e08d536e46258e7d151f40659f502062696c43))

## 2.2.2 (2021-03-19)

**Note:** Version bump only for package standard-log-syslog

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

**Note:** Version bump only for package standard-log-syslog

# 2.1.0 (2021-02-24)

### Features

- add logger.write(entry) ([28fe6c9](https://github.com/unional/standard-log/commit/28fe6c955b7c5dd3a13bef5f3276b7f4641b2d1f))

# 2.0.0 (2021-02-24)

### Features

- return result in captureLogs() ([#97](https://github.com/unional/standard-log/issues/97)) ([3f457c3](https://github.com/unional/standard-log/commit/3f457c37a685435a0d20802bb0be33565e58ba20))

### BREAKING CHANGES

- return signagure of captureLogs changed

- chore: update deps

## 1.5.10 (2020-12-19)

### Bug Fixes

- **color:** remove isBrowser and use browser field ([9a468e8](https://github.com/unional/standard-log/commit/9a468e8fb696be680138e707b050b38b4bbb2344))

## 1.5.9 (2020-12-16)

### Bug Fixes

- **syslog:** distribute src to fix source map ([65d1a83](https://github.com/unional/standard-log/commit/65d1a83098bb7c590a88899a828698c661485572))

## 1.5.8 (2020-10-28)

### Bug Fixes

- allow @ \ / in id ([#94](https://github.com/unional/standard-log/issues/94)) ([5684a0e](https://github.com/unional/standard-log/commit/5684a0e43d7dbb5956b3652d87fccee0e638da06))

## 1.5.7 (2020-10-28)

### Bug Fixes

- upgrade dependencies ([#93](https://github.com/unional/standard-log/issues/93)) ([0afc399](https://github.com/unional/standard-log/commit/0afc39942b74e1b2dd551e25b74cdd00739e0416))

## 1.5.6 (2020-08-30)

**Note:** Version bump only for package standard-log-syslog

## 1.5.5 (2020-08-30)

### Bug Fixes

- store initializer ([#92](https://github.com/unional/standard-log/issues/92)) ([aedefd3](https://github.com/unional/standard-log/commit/aedefd37ab90baddd540e728fb3d60be7d539abf))

## 1.5.4 (2020-03-07)

**Note:** Version bump only for package standard-log-syslog

## 1.5.3 (2020-03-07)

**Note:** Version bump only for package standard-log-syslog

## [1.5.2](https://github.com/unional/standard-log/compare/standard-log-syslog@1.5.1...standard-log-syslog@1.5.2) (2020-03-01)

### Bug Fixes

- default logLevel to info ([391b973](https://github.com/unional/standard-log/commit/391b973d504742232786c5266e80fa51bcba7f27))

## [1.5.1](https://github.com/unional/standard-log/compare/standard-log-syslog@1.5.0...standard-log-syslog@1.5.1) (2020-01-08)

### Bug Fixes

- update deps ([14e7064](https://github.com/unional/standard-log/commit/14e7064ede66143a9ebc3ee46d720ea47d4eef07))
- **color:** add tslib ([ac594d5](https://github.com/unional/standard-log/commit/ac594d54d9a5e12752cd18ff4e7a4f77d9e6188d))
- add sideEffects flag ([95ae4dc](https://github.com/unional/standard-log/commit/95ae4dc056bfbf552a645b681182d08cf56ca0b1))

# [1.5.0](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.9...standard-log-syslog@1.5.0) (2019-08-21)

### Features

- **syslog:** add createSyslogFormatter ([bd45709](https://github.com/unional/standard-log/commit/bd45709))

## [1.4.9](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.8...standard-log-syslog@1.4.9) (2019-08-10)

**Note:** Version bump only for package standard-log-syslog

## [1.4.8](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.7...standard-log-syslog@1.4.8) (2019-08-10)

### Bug Fixes

- remove spec files from package ([cae7eb7](https://github.com/unional/standard-log/commit/cae7eb7))

## [1.4.7](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.6...standard-log-syslog@1.4.7) (2019-08-09)

**Note:** Version bump only for package standard-log-syslog

## [1.4.6](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.5...standard-log-syslog@1.4.6) (2019-08-09)

**Note:** Version bump only for package standard-log-syslog

## [1.4.5](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.4...standard-log-syslog@1.4.5) (2019-08-08)

**Note:** Version bump only for package standard-log-syslog

## [1.4.4](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.3...standard-log-syslog@1.4.4) (2019-07-29)

**Note:** Version bump only for package standard-log-syslog

## [1.4.3](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.2...standard-log-syslog@1.4.3) (2019-07-29)

**Note:** Version bump only for package standard-log-syslog

## [1.4.2](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.1...standard-log-syslog@1.4.2) (2019-07-29)

**Note:** Version bump only for package standard-log-syslog

## [1.4.1](https://github.com/unional/standard-log/compare/standard-log-syslog@1.4.0...standard-log-syslog@1.4.1) (2019-07-28)

### Bug Fixes

- udpate peerDeps to 2.0.0 ([83ba5d2](https://github.com/unional/standard-log/commit/83ba5d2))

# 1.4.0 (2019-07-28)

### Bug Fixes

- **syslog:** add entry point ([fd300b2](https://github.com/unional/standard-log/commit/fd300b2))

### Features

- **syslog:** create project ([a109128](https://github.com/unional/standard-log/commit/a109128))
