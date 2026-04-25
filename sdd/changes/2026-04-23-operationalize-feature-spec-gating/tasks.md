# Tasks — operationalize feature/spec gating

**Change:** `2026-04-23-operationalize-feature-spec-gating`  
**Status:** Complete

---

**T1** Create `docs/conventions/spec-change-gating.md` with four sections:
- final decisions,
- updated definitions (`feature`, spec readiness),
- updated lifecycle,
- impact notes.

**T2** Update `docs/workflows/start-change.md` so `feature` changes require a ready spec before proposal creation, referencing `docs/conventions/spec-change-gating.md`.

**T3** Update `docs/workflows/start-plan.md` so planning a `feature` change requires verifying the linked spec is ready per `docs/conventions/spec-change-gating.md`.

**T4** Update `sdd/specs/README.md` to align with the new operational rule and point to the canonical convention.

**T5** Validate consistency and links across the updated files.

**T6** Validate that no application/runtime files changed (`src/`, `test/`, `dist/`, `package.json`, `tsconfig.json`, `biome.json`, `vitest.config.ts`, `tsup.config.ts`, `pnpm-lock.yaml`).

**T7** Mark this change complete (proposal `Status: Closed`, tasks `Status: Complete`).
