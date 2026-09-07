---
'standard-log': minor
---

Widen `@just-func/types` from `^0.5.0` to `^0.6.0`, and pin `type-plus` to `8.0.0-beta.10`, exactly.

**The unblock: `@just-func/types`.** The published `@just-func/types@0.5.1` still depends
on `type-plus@^5.0.0`, so every consumer of `standard-log` dragged `type-plus@5.6.0` into
its tree regardless of what else was pinned. `@just-func/types@0.6.0` is already on
`type-plus@8.0.0-beta.10`, but `^0.5.0` does not admit a `0.x` minor bump, so the widen to
`^0.6.0` is required to let it resolve. This removes a transitive `type-plus@5.6.0` from
every consumer's tree — that is the user-visible benefit of this release.

This is not a major bump: `standard-log@13.1.0`, the last published version, already
declared `type-plus: ^8.0.0-beta.10`, so the `typescript >= 5.6.0` peer it carries already
reached consumers in that release. Tightening the range to an exact version does not add
a new peer requirement, and building the package confirms no `type-plus` types leak into
the emitted `.d.ts`. The `@just-func/types` widening does change the resolved runtime
dependency tree for consumers (a `minor`-worthy change on its own), so this release is a
`minor` overall.

**Why pin instead of caret-range `type-plus`.** `^8.0.0-beta.10` resolves to
`>=8.0.0-beta.10 <9.0.0-0`, which admits every later 8.0.0 prerelease plus `8.0.0` and
`8.1.0`. 8 is a prerelease line where breaking changes land between betas — beta.10 to
beta.11 changed `Equal`'s signature and removed `isType.f`. An exact version makes each
bump a reviewable PR rather than something a lockfile refresh can do silently. Move back
to a caret once 8.0.0 is stable.

No source changes were needed for either move: this package's `type-plus` and
`@just-func/types` usage is unaffected by the 7 -> 8 and 0.5 -> 0.6 type surface changes.
