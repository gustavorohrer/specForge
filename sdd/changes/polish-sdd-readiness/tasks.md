# Tasks — polish SDD readiness

**Change:** `polish-sdd-readiness`
**Status:** `Complete`

---

## T1 — Fix I-1: remove inline gate commands from implement-task.md

**Produces:** Updated `docs/workflows/implement-task.md` step 4 that references `quality-gates.md` without duplicating the command sequence.

Replace the inline `pnpm run typecheck/lint/test/build` list with a pointer to `docs/conventions/quality-gates.md`. Keep the conditional branches (source change vs. docs-only). Do not change the docs-only exemption logic or any other step.

**Verify:** `implement-task.md` step 4 contains no `pnpm run` commands. It references `docs/conventions/quality-gates.md` by path. The docs-only branch and compliance bullets are intact.

→ **STOP** if any `pnpm run` command remains in step 4.

- [x] Complete.

---

## T2 — Fix I-2: extend tsconfig to cover test/

**Produces:** Updated `tsconfig.json` that includes `test/` in TypeScript type-checking, without breaking any existing script.

Remove `"rootDir": "src"` from `compilerOptions`. Change `"include": ["src"]` to `"include": ["src", "test"]`. No other changes to the file.

**Rationale:** `rootDir` is only needed when `tsc` emits files. Since `pnpm run build` uses `tsup` (which derives output paths from `tsup.config.ts`, not from tsconfig), and `pnpm run typecheck` uses `--noEmit`, removing `rootDir` does not affect either script. The `outDir` setting is retained.

**Verify:**
- `pnpm run typecheck` exits 0.
- `pnpm run build` exits 0.
- `pnpm run lint` exits 0.
- `tsconfig.json` contains no `rootDir` key.
- `tsconfig.json` `include` array is `["src", "test"]`.

→ **STOP** if any script fails after the change.

- [x] Complete.

---

## T3 — Update quality-gates.md with typecheck coverage note

**Produces:** Updated `docs/conventions/quality-gates.md` with a brief note that `pnpm run typecheck` covers both `src/` and `test/`.

Add `(covers src/ and test/)` to the typecheck comment in the full gate code block.

**Verify:** The typecheck line in `quality-gates.md` indicates it covers both directories.

→ **STOP** if the note changes the gate sequence or semantics.

- [x] Complete.

---

## T4 — Fix I-4: surface spec reference in proposal template

**Produces:** Updated `sdd/changes/_template/proposal.md` with spec reference as an active header field.

Move the spec reference out of the HTML comment block and into the header as an active line with a brief inline guidance comment. Non-feature proposals delete the line.

**Verify:** Opening `_template/proposal.md` shows the spec reference as a visible active field. The HTML comment block is removed.

- [x] Complete.

---

## T5 — Create summary and close change

**Produces:** `sdd/changes/polish-sdd-readiness/summary.md`. `tasks.md` status set to `Complete`. `proposal.md` status set to `Closed`.

**Verify:** All definition-of-done items are `[x]`. `summary.md` exists.

- [x] Complete.

---

## Definition of done

- [x] T1 complete: `implement-task.md` step 4 has no inline gate commands.
- [x] T2 complete: `tsconfig.json` covers `src/` and `test/`.
- [x] T3 complete: `quality-gates.md` notes typecheck coverage.
- [x] T4 complete: proposal template surfaces spec reference as an active field.
- [x] T5 complete: change closed.
- [x] No application code modified.
- [x] All quality gate scripts exit 0 after changes.
- [x] `docs/workflows/validate-docs.md` checklist passes.
