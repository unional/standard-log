---
"standard-log": minor
---

Instead of throwing `InvalidId`, now ID with invalid characters are replaced with `-`.
This make it easier to use when the ID are generated or contain some macro or formatting characters.

The errors are **deprecated** as a result.
They will be removed in the future.
