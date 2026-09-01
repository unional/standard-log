---
'standard-log': patch
'standard-log-color': patch
'standard-log-remote': patch
'standard-log-syslog': patch
---

Build with tsdown instead of webpack and multi-config `tsc`.

No API changes. `cjs/`, `esm/`, `ts/` and their `.d.ts`, `.d.ts.map` and `.js.map` files keep the
same paths and the same per-module shape, so every import — deep imports included — resolves as
before. What changes in the tarball:

- `dist/*.es5.js` (and `standard-log-color`'s `dist/*.nodenext.js`) are replaced by
  `dist/*.iife.js`, the same global-variable browser bundle built at ES2015. ES5 output is no longer
  producible: TypeScript 7 removed `target: ES5`, and rolldown supports ES2015 and later only. These
  bundles are not referenced by `exports`, `main`, `module`, `browser`, or the README.
- `dist/*.gz` copies are no longer published. Compressing on the wire is the server's job.
- `dist/*.esm.js` keeps its path.
