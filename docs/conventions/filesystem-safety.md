# Filesystem safety conventions

Defines the rules for all filesystem writes SpecForge performs into target projects.

These rules exist because SpecForge's purpose is writing files into repositories it does not own. An incorrect write is potentially irreversible.

## No-overwrite rule

SpecForge must not overwrite an existing file unless the user has explicitly opted in.

- Check whether the target file exists before every write.
- If it exists and there is no opt-in (`--force` flag or equivalent confirmed choice), throw a `UserError` with a message naming the file and explaining how to opt in.
- "Opt in" must be deliberate — not inferred, not assumed.

## Existence check

Every file write must be preceded by an existence check at the same path, using the same resolved absolute path that the write will use.

Do not rely on write errors to discover that a file exists. Check explicitly first.

## Absolute paths

All paths passed to filesystem operations must be resolved to absolute paths using `path.resolve()` before use.

- No relative path arithmetic inside `src/lib/` functions.
- Relative paths may be accepted as user input at the CLI layer; they must be resolved to absolute before being passed to any `src/lib/` function.
- This prevents path confusion between the process working directory and the target project root.

## Deterministic content

Generated file content must be deterministic: given the same inputs, the same bytes are produced every time. No timestamps, no random suffixes, no environment-specific values in generated content.

Rationale: determinism makes dry-run previews trustworthy and makes idempotent re-runs safe.

## Compute/write separation

Commands that write files must separate the "compute what to write" step from the "write it" step in code structure, even if a dry-run mode is not yet exposed to users.

The function that produces file content must be callable without triggering any I/O. The function that writes must be called separately and explicitly.

This makes dry-run mode addable with minimal code change, and makes the content logic independently testable without touching the disk.

## Write atomicity

File writes must prefer atomic-safe patterns where practical.

If a write is not atomic (e.g., a direct `fs.writeFile` without a temp-then-rename pattern), the failure behavior must be:

- Explicit: documented in the function's contract.
- Tested: a test covers what happens if the write fails mid-operation.

Prefer writing to a temporary path and renaming when the content is large or the target file's integrity matters. For small, idempotent scaffolding files, a direct write is acceptable if failure behavior is tested.

## Prohibited patterns

- Writing to a path that has not been resolved to absolute.
- Overwriting without an explicit existence check and user opt-in.
- Producing non-deterministic file content (timestamps, UUIDs, random bytes in generated content).
- Calling the write function from the same function that computes the content — keep them separate.
- Silently continuing when a write fails.

## See also

- [`docs/conventions/architecture.md`](./architecture.md) — filesystem operations belong in `src/lib/`, with injected fs dependencies
- [`docs/conventions/testing.md`](./testing.md) — filesystem tests use temp directories; failure behavior must be tested
- [`docs/conventions/errors.md`](./errors.md) — safety violations throw `UserError`; no-overwrite violations are `UserError`
- [`docs/conventions/target-stack.md`](./target-stack.md) — binding rule governs what is written into target projects
