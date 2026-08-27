---
name: OpenAPI validator compatibility
description: Covers an Orval and Zod compatibility edge case in this workspace's generated API validators.
---

The current OpenAPI generator can emit `zod.int()` for integer schemas and `zod.email()` for email-formatted strings, while the workspace validator package does not expose those helpers.

**Why:** Code generation succeeds, but the chained library typecheck fails after these helpers are emitted.

**How to apply:** For new contracts, use `type: number` when integer-only validation is not essential and validate email syntax explicitly at the server boundary unless the generator/runtime versions are upgraded together.