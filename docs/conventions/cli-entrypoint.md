# CLI entrypoint convention

The SpecForge binary is invoked as `specforge`.

## Entrypoints

- **Source:** `src/cli.ts` — the only entrypoint file.
- **Built:** `dist/cli.js` — emitted by `tsup` with `#!/usr/bin/env node` shebang injected.

## What `src/cli.ts` may contain

- Argument parsing (via `commander`).
- Command dispatch to handlers in `src/commands/`.
- Exit-code mapping.

## What `src/cli.ts` must not contain

- Business logic.
- Direct filesystem operations.
- Network calls.
- Any logic that warrants a unit test.

All testable logic lives under `src/lib/` or `src/commands/` and is called from `cli.ts`.

## Canonical scripts

| Script | Command (deferred) | Purpose |
|---|---|---|
| `dev` | `tsx src/cli.ts` | Run the CLI locally without a build step. |
| `build` | `tsup` | Bundle `src/cli.ts` to `dist/cli.js`. |
| `test` | `vitest run` | Run tests once (CI). |
| `test:watch` | `vitest` | Run tests in watch mode. |
| `lint` | `biome check .` | Lint + format check. |
| `format` | `biome format --write .` | Apply the formatter. |
| `typecheck` | `tsc --noEmit` | Type-only verification. |

## Reserved names

The script names in the table above are reserved. Introducing a new script name requires a dedicated SDD change — contributors must not add ad-hoc scripts.

## See also

- Originating change: [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](../../sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md)
