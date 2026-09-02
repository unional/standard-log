# standard-log-remote

## 13.0.2

## 13.0.1

### Patch Changes

- f41485e: Build with tsdown instead of webpack and multi-config `tsc`.
  
  No API changes. `cjs/`, `esm/`, `ts/` and their `.d.ts`, `.d.ts.map` and `.js.map` files keep the
  same paths and the same per-module shape, so every import — deep imports included — resolves as
  before. What changes in the tarball:
  
  - `dist/*.es5.js` (and `standard-log-color`'s `dist/*.nodenext.js`) are replaced by
    `dist/*.iife.js`, the same global-variable browser bundle built at ES2015. ES5 output is no longer
    producible: TypeScript 7 removed `target: ES5`, and rolldown supports ES2015 and later only. These
    bundles are not referenced by `exports`, `main`, `module`, `browser`, or the README.
  - `dist/*.gz` copies are no longer published. Compressing on the wire is the server's job.
  - `dist/*.esm.js` keeps its path.

## 13.0.0

### Patch Changes

- f79033b: Point package metadata (`repository`, `homepage`, `bugs`) at the `cyberuni` organization following the repository transfer.

## 12.1.2

## 12.1.1

## 12.1.0

## 12.0.5

## 12.0.4

## 12.0.3

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

- 55a8e0d: Init release
