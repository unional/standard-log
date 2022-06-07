---
"standard-log": major
---

Remove `captureLogs()` support.

While normal usage of `captureLogs()` is fine,
it is possible that the application may accidentally leak mutable code.

When that happens, hacker can override functions and capture the logs within,
and send it somewhere else.

Although the leak is likely break everything already,
having `captureLogs()` increase exposures.
