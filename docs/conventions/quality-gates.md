# Quality gates

Defines the minimum automated checks that must pass before any task is declared complete and before any PR is opened.

## Gate applicability

The required gate depends on what changed:

| Change type | Required checks |
|---|---|
| Any source, config, or test file changed | Full gate: typecheck → lint → test → build |
| Docs-only `sdd-system` change (no source/config/test files touched) | Documentation validation only (see below) |

When in doubt, run the full gate. The exemption is narrow: it applies only when the diff contains exclusively Markdown and documentation files under `docs/`, `sdd/`, `AGENTS.md`, `CLAUDE.md`, or `README.md`.

## Full gate

Run in this order. Each step must exit 0 before proceeding to the next.

```
pnpm run typecheck   # tsc --noEmit (covers src/ and test/)
pnpm run lint        # biome check .
pnpm run test        # vitest run
pnpm run build       # tsup
```

**Why this order:**

1. `typecheck` — cheapest; catches most issues before running anything expensive.
2. `lint` — fast (Biome runs in milliseconds); catches style and logic issues.
3. `test` — confirms behavioral correctness; depends on types and lint being clean.
4. `build` — confirms the CLI entry bundles cleanly; catches import/resolution issues that type-checking alone does not catch.

A failure at any step is a blocker. Fix the failure before continuing.

## Convenience script (pending)

A `pnpm run validate` composite script that runs the full gate in one command has not yet been added. Adding it requires a dedicated `tooling/foundation` change per [`docs/conventions/cli-entrypoint.md`](./cli-entrypoint.md) (reserved script names).

Until that change lands, run the four commands individually in the order above.

## Documentation validation

For all change types, run the checklist in [`docs/workflows/validate-docs.md`](../workflows/validate-docs.md) before closing the change.

For docs-only `sdd-system` changes, this is the only required gate.

## When to run

- Before marking a task `[x]` complete in `tasks.md`.
- Before opening a PR.

Do not mark a task complete if any gate step fails.

## See also

- [`docs/conventions/cli-entrypoint.md`](./cli-entrypoint.md) — canonical script definitions
- [`docs/workflows/implement-task.md`](../workflows/implement-task.md) — verification step references this document
- [`docs/workflows/validate-docs.md`](../workflows/validate-docs.md) — documentation validation checklist
