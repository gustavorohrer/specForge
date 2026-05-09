# Summary — polish SDD readiness

**Change ID:** `polish-sdd-readiness`
**Closed:** 2026-05-09

## What changed

Three targeted fixes from the final readiness audit.

### I-1: Quality gate deduplication (`implement-task.md`)

Removed the inline `pnpm run typecheck/lint/test/build` command list from `implement-task.md` step 4. Replaced with: "run the full quality gate defined in `docs/conventions/quality-gates.md`." The docs-only exemption branch is preserved. `quality-gates.md` is now the single source of truth for the gate sequence — a change to the gate no longer requires updating `implement-task.md`.

### I-2: Test file type-checking (`tsconfig.json`)

Removed `"rootDir": "src"` from `tsconfig.json` and changed `"include"` from `["src"]` to `["src", "test"]`. `pnpm run typecheck` now covers both `src/` and `test/`. Build is unaffected — `tsup` controls output paths from `tsup.config.ts` independently of `tsconfig`. The `outDir` setting is retained. Updated `quality-gates.md` to note the expanded coverage.

### I-4: Proposal template spec reference (`_template/proposal.md`)

Moved the spec reference from an HTML comment block to an active header field with a brief inline guidance comment. Feature proposals fill it in; non-feature proposals delete the line. The field is now visible and can no longer be silently skipped.

## Validation performed

- `pnpm run typecheck` — exit 0.
- `pnpm run build` — exit 0; output identical (`dist/cli.js`, 366 B, shebang present).
- `pnpm run lint` — exit 0; 2 files checked.

## What did not change

- Gate steps, sequence, or semantics.
- `package.json` scripts or their commands.
- `cli-entrypoint.md`.
- Any workflow semantics.
- Any application code.
