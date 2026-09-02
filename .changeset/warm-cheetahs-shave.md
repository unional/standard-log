---
'standard-log-color': patch
---

Hold `supports-color` in the `^8` line so CommonJS consumers can load the package again.

`13.0.1` raised the range to `^11.0.0`. `supports-color@9` and later are `"type": "module"` with no `require` condition, so a CommonJS consumer of this package's `cjs/` build fails with `SyntaxError: Unexpected token 'export'` under jest, Electron, jsdom and webpack. Modern Node hid it, because `require(ESM)` loads the file anyway. `^8.1.1` is the newest line that still publishes CommonJS, and is what `12.1.2` used after the same bug was fixed the first time.

A regression test now resolves every runtime dependency under the `require` condition and loads it with Node's `require(ESM)` support turned off, so reintroducing an ESM-only runtime dependency fails the suite.
