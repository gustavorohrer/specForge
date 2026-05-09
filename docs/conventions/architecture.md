# Architecture conventions

Defines the module boundaries and layering rules for all implementation code in this repository.

## Three-layer model

SpecForge source code is organized into three layers. Each layer has an exclusive responsibility. Crossing layer boundaries in the wrong direction is a defect.

| Layer | Path | Responsibility |
|---|---|---|
| CLI wiring | `src/cli.ts` | Argument parsing, command dispatch, error boundary delegation |
| Command handlers | `src/commands/` | Orchestration — coordinate `src/lib/` calls; surface results and errors to the CLI layer |
| Library | `src/lib/` | All reusable, testable logic; pure functions or dependency-injected side effects |

### `src/cli.ts` rules

- Parses arguments (via `commander`) and dispatches to command handlers.
- Delegates error classification and formatting to a boundary module — it must not contain heavy error handling logic itself.
- Must not contain business logic, filesystem operations, network calls, or any code that warrants a unit test.
- Is linear top-to-bottom: no classes, no factories, no dynamic imports.

See also: [`docs/conventions/cli-entrypoint.md`](./cli-entrypoint.md) for entrypoint file requirements.

### `src/commands/` rules

- Each file corresponds to one top-level command.
- Command handlers orchestrate: they call `src/lib/` functions, handle the sequence of operations, and return or throw for the CLI layer to handle.
- Must not contain business logic that belongs in `src/lib/`. If a function is worth testing independently, it belongs in `src/lib/`.
- May import from `src/lib/` only. Must not import from sibling command files.

### `src/lib/` rules

- Contains all reusable, independently testable logic.
- Functions must be pure or have all side-effectful dependencies injected (see Dependency injection below).
- Must not import from `src/commands/` or `src/cli.ts`.
- Must not access the filesystem, network, or `process` directly — these must be injected.

## Dependency injection

Any module with side effects — filesystem (`node:fs`), process (`process`), network — must be injected as a parameter or passed through a thin adapter, not imported directly inside functions that need to be unit tested.

This applies to all functions in `src/lib/` and `src/commands/`. The adapter types are defined in `src/lib/` alongside the functions that consume them.

Rationale: direct imports of side-effectful modules make unit tests impossible without module-level mocking. Injecting them lets tests pass fakes.

## No hidden global state

No module-level mutable variables shared between commands or across invocations. Each command invocation operates on its inputs and produces its outputs with no shared state side effects.

## Test mirroring

`test/` mirrors the structure of `src/` exactly:

| Source file | Test file |
|---|---|
| `src/lib/foo.ts` | `test/lib/foo.test.ts` |
| `src/commands/init.ts` | `test/commands/init.test.ts` |

The mirror rule ensures tests are easy to locate and that coverage gaps are visible.

## See also

- [`docs/conventions/cli-entrypoint.md`](./cli-entrypoint.md) — entrypoint file and canonical script rules
- [`docs/conventions/testing.md`](./testing.md) — test structure and patterns that follow from this architecture
- [`docs/conventions/errors.md`](./errors.md) — how errors propagate through the layers
- [`docs/conventions/typescript.md`](./typescript.md) — TypeScript coding rules that enforce this model
