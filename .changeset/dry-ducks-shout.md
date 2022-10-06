---
"standard-log-color": minor
"standard-log": patch
---

Add `getNonConsoleLogger()`.

This is useful for specific cases where you want to write a log to the reporters but do not want to show it in the console.
For example, log errors within catch block or `window.onerror`.

Because of this, all reporters now must have a non-empty `id`.
It should be the case but was not enforced before.

Fixing `createStandardLogForTest()` to not set itself as the global instance anymore.

Adjust some records to use `record()/Object.create(null)`.
