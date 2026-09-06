---
'standard-log': minor
---

Move `type-plus` from `^7.0.0` to `^8.0.0-beta.10`.

`type-plus` 7 depends on `tersify` ^3, and because `type-plus` is a runtime dependency of
`standard-log`, that pulled `tersify` 3.x into every downstream consumer's tree — including
`@just-web/log`, which ends up with two majors of `tersify` installed side by side.
`type-plus` 8 depends on `tersify` ^4, so this deduplicates that for consumers.

The range is a caret on the beta so it resolves forward to `8.0.0` once that ships.

Bumped as a minor rather than a patch: no public type or runtime API of `standard-log`
changes (the built `.d.ts` files reference no `type-plus` types, and all four packages
build, typecheck, and test unchanged), but consumers do get a different major of a
runtime dependency, which is more than a bug fix.
