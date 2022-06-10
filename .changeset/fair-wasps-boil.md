---
"standard-log": major
---

Adding a logger specific custom console report will not reuse the existing console reporter.

Originally it will adjust the `filter` of the existing console reporter.

But this ability can disable all console logs easily.
Meaning important console log messages will be hidden from the user.
