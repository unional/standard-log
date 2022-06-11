---
"standard-log": major
---

Remove log reporters functions.

The log reporters should not be changed during runtime.

Should only be configured during `config()`.

The same when during test, use `configForTest()`.

`standard-log-color` is no longer load by default.

To use `standard-log-color`, you should create the reporter manually:

```ts
import { createStandardLog } from 'standard-log'
import { createColorLogReporter } from 'standard-log-color'

const standardLog = createStandardLog({ reporters: [createColorLogReporter()] })
```

This ability is removed because in ESM, `require()` is no-longer available,
and `import()` is dynamic import and not synchronous.
