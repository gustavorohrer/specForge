# Summary — stabilize SDD base workflow

**Date:** 2026-05-04

## What changed

### Historical normalization

- `2026-04-22-define-node-typescript-cli-foundation/proposal.md`: Status `Draft (proposed)` → `Closed`.
- `2026-04-22-define-node-typescript-cli-foundation/tasks.md`: Added `Status: Complete`; marked all definition-of-done items `[x]`.
- `2026-04-22-install-cli-foundation/proposal.md`: Status `Draft (not started)` → `Closed` (tasks.md was already `Complete`).
- `2026-04-23-strengthen-tooling-change-workflows/proposal.md`: Type `SDD system improvement (no application code changes)` → `sdd-system`.

### Removed

- `docs/features/_template/feature.md`, `docs/features/_template/plan.md`, `docs/features/_template/task-example.md` — feature doc templates deleted. The layer they represented was unused and redundant with `sdd/specs/` and `sdd/changes/`.
- `docs/features/cli-foundation/feature.md` — the only existing feature doc. Its substantive content was already captured in `docs/conventions/cli-entrypoint.md` and the originating proposal.

### Updated (active docs)

- `docs/workflows/start-plan.md`: Removed step that told contributors to create `docs/features/<feature-name>/`. Removed corresponding Output bullet.
- `docs/workflows/implement-task.md`: Removed `Feature-layer docs (docs/features/)` from the documentation sync checklist.
- `docs/workflows/validate-docs.md`: Rewrote the checklist into change-type-aware sections (change artifacts, feature specs, process docs, project-wide). Removed the ambiguous `docs/features/` item.
- `docs/workflows/start-task.md`: Added explicit pointer to `docs/conventions/change-artifacts.md` alongside the operational status reminders.
- `docs/conventions/documentation.md`: Removed `Feature documentation | docs/features/<feature-name>/` from Where things live table.
- `docs/conventions/cli-entrypoint.md`: Removed broken See also link to the now-deleted `docs/features/cli-foundation/feature.md`.
- `sdd/changes/README.md`: Added Templates section pointing to `sdd/changes/_template/`.

### Created

- `sdd/changes/_template/proposal.md` — canonical starter for new proposals with all required header fields and section structure.
- `sdd/changes/_template/tasks.md` — canonical starter for new tasks files.

## What was intentionally not changed

- `AGENTS.md` — no `docs/features/*` references; intent table was clean.
- `docs/workflows/start-change.md` — clean; no changes needed.
- `docs/workflows/write-spec.md` — clean (added earlier in this session).
- `docs/conventions/change-artifacts.md` — remains the source of truth for status rules; no changes needed.
- Historical proposal/task bodies — rationale and task descriptions were not rewritten; only header metadata was normalized.

## Canonical workflow after this change

```
idea / problem
→ classify change type (feature | tooling/foundation | sdd-system | fix)
→ if feature: write ready spec in sdd/specs/ (workflow: docs/workflows/write-spec.md)
→ create sdd/changes/<change-id>/proposal.md  (template: sdd/changes/_template/proposal.md)
→ approve proposal
→ create sdd/changes/<change-id>/tasks.md  (template: sdd/changes/_template/tasks.md)
→ implement tasks (docs/workflows/start-task.md → implement-task.md)
→ validate (docs/workflows/validate-docs.md)
→ close change (tasks.md Complete, proposal.md Closed)
```
