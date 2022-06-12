---
"standard-log": patch
---

Adjust `getLogger()` signature back to `(id: string, options?: LoggerOptions)`.

Will need some utility functions to be in-place before pushing the `just-func` paradigm to JS/TS.

Currently, JS/TS is not ready for `const [,{ error }] = getLogger()` way to do things.

It is possible, but should investigate to see if there is a better way to make the transition seamless.

Likely some transformation WebAssembly runtime written in rust would be needed.
