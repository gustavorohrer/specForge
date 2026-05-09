# Proposal — polish SDD readiness

- **Change ID:** `polish-sdd-readiness`
- **Status:** `Closed`
- **Type:** `tooling/foundation`
- **Date:** 2026-05-09

## 1. Problem statement

Three targeted drift risks identified in the final readiness audit:

- **I-1:** `implement-task.md` step 4 duplicates the quality gate command sequence owned by `quality-gates.md`. A change to the gate requires updating two files.
- **I-2:** `tsconfig.json` excludes `test/`, leaving test files un-type-checked by `pnpm run typecheck`. Type errors in tests are invisible to the quality gate.
- **I-4:** The feature spec reference in `_template/proposal.md` is inside an HTML comment. An agent creating a feature proposal from the template can miss it.

## 2. Objectives

1. Make `quality-gates.md` the single source of truth for the gate sequence.
2. Ensure `pnpm run typecheck` covers both `src/` and `test/`.
3. Surface the spec reference placeholder visibly in the proposal template.

## 3. Scope

### In scope

- `docs/workflows/implement-task.md` — remove inline gate command list, replace with pointer.
- `tsconfig.json` — remove `rootDir`, add `test` to `include`.
- `sdd/changes/_template/proposal.md` — make spec reference an active visible field.
- `docs/conventions/quality-gates.md` — brief note that typecheck now covers `test/`.
- `sdd/changes/polish-sdd-readiness/` — this change's artifacts.

### Out of scope

- `pnpm run validate` composite script.
- Coverage thresholds.
- Historical artifact normalization.
- Any application code (`src/`, `test/`, `dist/`).
- CI configuration.
- New workflows or conventions.

## 4. Risks

- **Removing `rootDir` from `tsconfig.json`:** Safe because `pnpm run build` uses `tsup`, which controls output paths from `tsup.config.ts` independently of `tsconfig`. `pnpm run typecheck` uses `--noEmit` and does not write files. The `outDir` setting is retained and does not affect type-checking behavior.
- **Changing the proposal template:** Non-feature proposals must delete one line. Minimal friction; the change makes feature proposals safer.

## 5. Success criteria

- `pnpm run typecheck` exits 0 and covers files in both `src/` and `test/`.
- `pnpm run build` exits 0; build output is identical to before.
- `pnpm run lint` exits 0.
- `implement-task.md` step 4 contains no `pnpm run` commands.
- Proposal template shows spec reference as a visible active line.
- No gate step added or removed; semantics unchanged.
