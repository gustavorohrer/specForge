# Error handling conventions

Defines how errors are classified, propagated, surfaced, formatted, and exit-coded across all commands.

## Error categories

All errors fall into one of two categories:

| Category | Meaning | Exit code | Output |
|---|---|---|---|
| `UserError` | Expected failure the user can fix | 1 | Actionable message on stderr; no stack trace |
| Unexpected error | Unhandled exception or internal bug | 2 | Minimal message on stderr; stack trace allowed in debug mode |

### `UserError`

A `UserError` is an error the user caused or can resolve: wrong path, file already exists, missing required flag, invalid input.

Requirements:

- Must extend `Error`.
- Must carry a user-readable message describing: what failed, what was provided, and what the user can do.
- Must not expose a stack trace to the user.
- Must not be caught silently.

Example message format: `"File already exists: /path/to/file. Use --force to overwrite."`

### Unexpected errors

An unexpected error is anything not classified as `UserError`: unhandled exception, assertion failure, internal invariant violation.

Requirements:

- Exit with code 2.
- Print a minimal message to stderr: `"Unexpected error: <message>"`.
- In debug/verbose mode only: include the stack trace.
- Never swallow silently.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | User error — wrong input, precondition failure |
| 2 | Unexpected / internal error |

`--help` exits 0. Argument parsing errors exit 1. SpecForge must never exit 0 if an error occurred.

## stdout vs. stderr

- **stdout**: user-observable output only — content the user may pipe, redirect, or process. Deterministic.
- **stderr**: error messages, warnings, status messages, and diagnostics. Never machine-parsed output.

If a command produces no user-observable output on success (e.g., writes files silently), stdout is empty. A confirmation message goes to stderr.

## Error propagation

Errors originate in `src/lib/`, propagate through `src/commands/`, and are handled at the CLI boundary:

1. `src/lib/` functions throw `UserError` for expected failures. Unexpected errors propagate as-is.
2. `src/commands/` handlers do not catch errors unless they need to add context before re-throwing. They must not swallow errors.
3. `src/cli.ts` is the error boundary. It catches all errors from command handlers and delegates classification and formatting to a boundary module (not to inline logic in `cli.ts` itself), then maps to the appropriate exit code.

The boundary module (to be defined when the first command is implemented) encapsulates the classification logic and keeps `src/cli.ts` thin.

## Error message requirements

Every error message surfaced to the user must include:

- What failed (the operation or check that did not succeed).
- What was provided (the input that triggered the failure, where applicable).
- What the user can do (correction, flag, or next step).

Do not emit generic messages like `"Error: something went wrong"`.

## Prohibited patterns

- `catch (e) {}` — silent swallowing is never acceptable.
- Throwing strings, numbers, or plain objects — always throw instances of `Error` or its subclasses.
- Printing errors to stdout.
- Exiting with code 0 when an error occurred.
- Emitting a raw stack trace for a `UserError`.

## See also

- [`docs/conventions/architecture.md`](./architecture.md) — layer model that defines where errors originate and where they are caught
- [`docs/conventions/testing.md`](./testing.md) — every error mode must have a test
- [`docs/conventions/typescript.md`](./typescript.md) — TypeScript rules for error types
