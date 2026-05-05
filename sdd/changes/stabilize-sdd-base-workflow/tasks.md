# Tasks — stabilize SDD base workflow

**Change:** `stabilize-sdd-base-workflow`
**Status:** `Complete`

## T1 — Normalize historical change metadata

- `define-node-typescript-cli-foundation/proposal.md`: set Status to `Closed`.
- `define-node-typescript-cli-foundation/tasks.md`: add `**Status:** Complete`; mark all definition-of-done items `[x]`.
- `install-cli-foundation/proposal.md`: set Status to `Closed` (tasks.md already `Complete`).
- `strengthen-tooling-change-workflows/proposal.md`: fix Type to `sdd-system`.

## T2 — Delete `docs/features/*`

- Delete `docs/features/_template/feature.md`.
- Delete `docs/features/_template/plan.md`.
- Delete `docs/features/_template/task-example.md`.
- Delete `docs/features/cli-foundation/feature.md`.
- Remove empty directories.

## T3 — Remove active-workflow references to `docs/features/*`

- `docs/workflows/start-plan.md`: remove step 4 (feature dir creation); update Output section.
- `docs/workflows/implement-task.md`: remove `Feature-layer docs (docs/features/)` from documentation sync check.
- `docs/conventions/documentation.md`: remove `Feature documentation | docs/features/<feature-name>/` row from Where things live table.
- `docs/conventions/cli-entrypoint.md`: remove See also link to `docs/features/cli-foundation/feature.md`.

## T4 — Restructure `validate-docs.md`

Rewrite the checklist to be change-type-aware: separate sections for change artifacts, feature specs, process docs, and project-wide checks. Remove the `docs/features/` item.

## T5 — Add canonical templates

- Create `sdd/changes/_template/proposal.md`.
- Create `sdd/changes/_template/tasks.md`.
- Update `sdd/changes/README.md` to reference the templates.

## T6 — Reduce status-rule duplication

- `docs/workflows/start-task.md`: add explicit pointer to `docs/conventions/change-artifacts.md` alongside the existing operational reminders.
- Confirm `docs/workflows/implement-task.md` status reconciliation step already references `change-artifacts.md` (no restatement needed).

## T7 — Validate

- Confirm no remaining active references to `docs/features` in workflow and convention docs.
- Confirm no non-canonical status/type values in current (non-historical) change artifacts.
- Confirm all internal links in modified files resolve.
- Confirm no application code changed.

## T8 — Close change

- Set `tasks.md` status to `Complete`.
- Set `proposal.md` status to `Closed`.
- Add `summary.md`.

## Definition of done

- [x] Historical changes have canonical status/type values and closure rule satisfied.
- [x] `docs/features/*` deleted.
- [x] No active workflow or convention references `docs/features/*`.
- [x] `validate-docs.md` restructured; no `docs/features/` item.
- [x] `sdd/changes/_template/` created with both templates.
- [x] `sdd/changes/README.md` updated.
- [x] Status-rule pointer added to `start-task.md`.
- [x] Validation checks pass.
- [x] No application code changed.
