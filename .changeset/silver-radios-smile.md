---
'standard-log-color': patch
'standard-log': patch
---

Adjust jsdoc.

Remove the `import { ... } from 'standard-log'` from the examples.
This allows the type and docs to be reused when other packages exports the types or instances.
