# Tasks — define engineering quality conventions

**Change:** `define-engineering-quality-conventions`
**Status:** Complete

---

## T1 — Create `docs/conventions/architecture.md`

**Produces:** Convention document defining the three-layer model (`cli.ts` / `commands/` / `lib/`), dependency injection rule, no global state rule, and test mirroring rule.

**Verify:** File exists. Covers rules for all three layers. DI requirement is explicit. No overlap with `cli-entrypoint.md` content.

→ **STOP** if any layer rule is ambiguous or contradicts `cli-entrypoint.md`.

- [x] Complete.

---

## T2 — Create `docs/conventions/testing.md`

**Produces:** Convention document defining test types (unit for `lib/`, command-level for `commands/`), test placement (mirror rule), temp directory pattern, mocking strategy, error path coverage requirement.

**Refinement applied:** Coverage required for exported behavior of `src/lib/`, not every internal helper. Internal helpers may be tested through the exported API.

**Verify:** File exists. Temp directory pattern is concrete (example code included). Error path coverage requirement is explicit.

- [x] Complete.

---

## T3 — Create `docs/conventions/errors.md`

**Produces:** Convention document defining `UserError` / unexpected error categories, exit codes (0/1/2), stdout/stderr rule, error message requirements, propagation model, prohibited patterns.

**Refinement applied:** `src/cli.ts` remains thin — error classification and formatting are delegated to a boundary module, not inlined in `cli.ts`.

**Verify:** File exists. Exit code map is complete. stdout/stderr rule is binary. Propagation model is described.

- [x] Complete.

---

## T4 — Create `docs/conventions/filesystem-safety.md`

**Produces:** Convention document defining no-overwrite rule, existence check requirement, absolute paths rule, deterministic content rule, compute/write separation, and atomicity expectations.

**Refinement applied:** "No partial writes" is replaced with: writes must prefer atomic-safe patterns where practical; if not atomic, failure behavior must be explicit and tested.

**Verify:** File exists. No-overwrite rule is specific. Compute/write separation is concrete. Atomicity expectation is clearly scoped.

- [x] Complete.

---

## T5 — Create `docs/conventions/typescript.md`

**Produces:** Convention document defining rules for `any`, explicit return types, error types, no barrel files, exhaustiveness checks, no speculative generics, DI over direct side-effectful imports, ESM import extensions.

**Refinement applied:** `any` is disallowed by default but allowed when isolated, justified, and not leaked across module boundaries. Rationale comment required at use site.

**Verify:** File exists. All rules are binary (pass/fail). `any` exception is precisely scoped.

- [x] Complete.

---

## T6 — Create `docs/conventions/quality-gates.md`

**Produces:** Convention document defining the full gate (typecheck → lint → test → build) and the docs-only exemption. Notes that `pnpm run validate` is pending a separate `tooling/foundation` change.

**Refinement applied:** Docs-only `sdd-system` changes are exempt from the source build/test gate if no source/config/test files were touched. They still require documentation validation.

**Verify:** File exists. Gate order and rationale are stated. Exemption is narrowly defined. Manual equivalent is documented.

- [x] Complete.

---

## T7 — Update `docs/conventions/base.md`

**Produces:** Updated Tooling section with an "Engineering conventions" subsection linking all 6 new documents.

**Verify:** All 6 new docs are linked. No existing link was removed or modified.

- [x] Complete.

---

## T8 — Update `docs/workflows/implement-task.md`

**Produces:** Updated step 1 (read convention docs before coding) and step 4 (verify per `quality-gates.md` with explicit branch for source vs. docs-only changes).

**Verify:** `quality-gates.md` is linked in step 4. Convention doc pointers are in step 1. Both the full gate and docs-only path are described.

- [x] Complete.

---

## T9 — Update `AGENTS.md`

**Produces:** New section 8 "Before implementing code" with a table pointing agents to the 6 new convention documents and when to read each.

**Verify:** Section exists. All 6 docs are named with their exact path. Quality gate reminder is present.

- [x] Complete.

---

## T10 — Create SDD change artifacts

**Produces:** `sdd/changes/define-engineering-quality-conventions/proposal.md`, `tasks.md`, `summary.md`.

**Verify:** All three files exist. `proposal.md` is `Closed`. `tasks.md` is `Complete`. `summary.md` describes the outcome.

- [x] Complete.

---

## Definition of done

- [x] T1–T9 complete: all 6 convention documents created, all 3 existing files updated.
- [x] T10 complete: change artifacts created and closed.
- [x] No source code modified (`src/`, `test/`, `dist/` unchanged).
- [x] No rule is duplicated across convention documents.
- [x] `docs/workflows/validate-docs.md` checklist passes for affected docs.
