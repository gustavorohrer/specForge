# Tasks — strengthen tooling change workflows

**Change:** `2026-04-23-strengthen-tooling-change-workflows`
**Status:** Complete

---

**T1** Update `docs/workflows/start-plan.md` — add change classification requirement and a tooling/foundation checklist section that references `docs/conventions/tooling-changes.md`.

**T2** Update `docs/workflows/implement-task.md` — add probe-first validation rule for tasks that depend on unverified tooling assumptions.

**T3** Update `docs/conventions/documentation.md` — add spec-reality mismatch rule (§4.6 of proposal).

**T4** Create `docs/conventions/tooling-changes.md` — canonical reference for all tooling/foundation change requirements: change classification, versioning policy, compatibility assumptions, cross-cutting ownership, validation probes.

**T5** Validate cross-links: confirm all references between updated files are accurate and that `docs/conventions/tooling-changes.md` is reachable from both workflow files.

**T6** Validate no application code changed: confirm `src/`, `test/`, `dist/`, `package.json`, `tsconfig.json`, `biome.json`, `vitest.config.ts`, `tsup.config.ts` are untouched.

**T7** Mark this change complete: update `proposal.md` status to `Closed` and update this file's status to `Complete`.
