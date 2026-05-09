# Testing conventions

Defines the testing strategy, patterns, and required coverage for this project. All tests use [Vitest](https://vitest.dev/).

## Test types and placement

Tests live under `test/` and mirror the structure of `src/`:

| Source file | Test file |
|---|---|
| `src/lib/foo.ts` | `test/lib/foo.test.ts` |
| `src/commands/init.ts` | `test/commands/init.test.ts` |

### Unit tests (`test/lib/`)

Cover all **exported behavior** in `src/lib/`. Internal helpers do not require direct tests — they may be tested through the public/exported API they support.

Each test file must cover:

- The success path for each exported function.
- Every error mode defined for that function (see [`docs/conventions/errors.md`](./errors.md)).

### Command-level tests (`test/commands/`)

Cover command handlers in `src/commands/`. Each command test must include:

- At least one success-path test for the full command flow.
- At least one test for each defined error mode the command can produce.

Command tests mock all side-effectful dependencies (filesystem, process) rather than invoking real system state.

## Mocking strategy

Use `vi.mock` (Vitest) to intercept side-effectful modules. The preferred pattern is to inject dependencies through the architecture layer (see [`docs/conventions/architecture.md`](./architecture.md)) so that test doubles can be passed directly without module-level mocking.

When module-level mocking is necessary:

- Mock the minimal surface required. Do not mock an entire module when one function is needed.
- Restore mocks after each test using `afterEach` or `vi.restoreAllMocks()`.

Never use real filesystem paths outside of temp directories (see below).

## Filesystem tests and temp directories

Tests that need filesystem access must use a temporary directory scoped to the test:

```ts
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'specforge-test-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})
```

Rules:

- The temp directory is created in `beforeEach` and removed in `afterEach`.
- No test reads from or writes to paths outside its temp directory.
- Tests must not assume the temp directory path is stable across runs.
- Tests must not depend on files left by a previous test.

## Test independence

- Tests must not depend on each other or on execution order.
- No shared mutable state between tests in the same file.
- Each test sets up and tears down everything it needs.

## Error path coverage

Every error mode defined in a function's contract must have a corresponding test. A function that can throw a `UserError` with three distinct causes must have three tests — one per cause.

This requirement applies to exported `src/lib/` functions and to command handlers. See [`docs/conventions/errors.md`](./errors.md) for error classification.

## What tests must not do

- Read from or write to paths outside a temp directory the test created.
- Access the network.
- Call `process.exit()` directly — inject or mock it.
- Depend on environment variables that are not set explicitly in the test.
- Leave state that affects other tests.

## See also

- [`docs/conventions/architecture.md`](./architecture.md) — DI pattern that makes unit testing possible
- [`docs/conventions/errors.md`](./errors.md) — error modes that must be covered by tests
- [`docs/conventions/quality-gates.md`](./quality-gates.md) — test is part of the quality gate before merge
