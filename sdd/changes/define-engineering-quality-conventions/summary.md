# Summary — define engineering quality conventions

**Change ID:** `define-engineering-quality-conventions`
**Closed:** 2026-05-09

## What was done

Created 6 new convention documents defining the engineering foundation for all future implementation work:

| Document | Defines |
|---|---|
| `docs/conventions/architecture.md` | Three-layer model (`cli.ts` / `commands/` / `lib/`), dependency injection, no global state, test mirroring |
| `docs/conventions/testing.md` | Test types, placement, temp directory pattern, mocking strategy, error path coverage |
| `docs/conventions/errors.md` | `UserError` / unexpected categories, exit codes 0/1/2, stdout/stderr rules, propagation model |
| `docs/conventions/filesystem-safety.md` | No-overwrite rule, existence check, absolute paths, deterministic content, compute/write separation, atomicity |
| `docs/conventions/typescript.md` | No `any`, explicit return types, error types, no barrels, exhaustiveness, ESM imports |
| `docs/conventions/quality-gates.md` | Full gate (typecheck → lint → test → build), docs-only exemption, pending `validate` script |

Updated 3 existing files:

- `docs/conventions/base.md` — Added "Engineering conventions" section linking all 6 new documents.
- `docs/workflows/implement-task.md` — Step 1 now lists which convention docs to read before coding; step 4 now references `quality-gates.md` with explicit branches for source and docs-only changes.
- `AGENTS.md` — Added section 8 "Before implementing code" with a table of when to read each convention document.

## Refinements applied from the approved proposal

1. **Testing:** Coverage required for exported behavior of `src/lib/`, not every internal helper.
2. **Filesystem safety:** "No partial writes" reworded to prefer atomic-safe patterns where practical; if not atomic, failure behavior must be explicit and tested.
3. **Error boundary:** `src/cli.ts` remains thin; error classification and formatting are delegated to a boundary module.
4. **TypeScript `any`:** Disallowed by default; allowed when isolated, justified, and not leaked — rationale comment required.
5. **Quality gate:** Docs-only `sdd-system` changes exempt from build/test gate if no source/config/test files touched.

## What was not done (out of scope)

- No `pnpm run validate` script added — requires a separate `tooling/foundation` change.
- No application code modified.
- No coverage thresholds defined (open decision in `sdd/project.md`).
- No CI added.

## Remaining open questions

- **Coverage thresholds** — still an open decision in `sdd/project.md`. Should be resolved when the first tests exist and a baseline can be measured.
- **`validate` script** — a `tooling/foundation` change to add `pnpm run validate` to `package.json` and update `cli-entrypoint.md` should follow when convenient.
- **Error boundary module** — `errors.md` defines that `cli.ts` delegates to a boundary module for classification/formatting. The exact interface and location of that module is defined when the first command is implemented.
