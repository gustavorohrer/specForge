# Tasks — standardize change artifacts and status

**Change:** `standardize-change-artifacts-and-status`
**Status:** `Complete`

## T1 — Define canonical artifact/status convention

Create a canonical convention document for change artifacts/status semantics, including:

- folder structure
- artifact purposes
- optional `design.md` rule
- valid statuses
- status relationship rules (proposal/tasks), including:
  - `tasks.md` `Blocked` => `proposal.md` `In Progress`
  - proposal must not be `Closed` before `tasks.md` is `Complete`
- closure rule
- historical migration policy

## T2 — Align core change/workflow docs to folder-per-change model

Update:

- `sdd/changes/README.md`
- `docs/workflows/start-change.md`
- `docs/workflows/start-plan.md`
- `docs/workflows/start-task.md`

Replace single-file instructions with folder-based instructions and explicit proposal/tasks handoff.

## T3 — Align adjacent workflow/template docs

Update references that still assume “change file + ## Plan”:

- `docs/workflows/implement-task.md`
- `docs/workflows/validate-docs.md`
- `docs/features/_template/feature.md`
- `docs/features/_template/plan.md`
- `docs/conventions/git.md`
- `docs/conventions/spec-change-gating.md` (only if wording conflicts)

## T4 — Normalize historical change metadata opportunistically

When touching an existing `sdd/changes/*/{proposal,tasks}.md` for other reasons, normalize status headers to canonical values and resolve proposal/tasks mismatches in that touched change only. No mandatory repo-wide backfill in this change.

## T5 — Validate consistency

- Verify no remaining single-file model references in docs.
- Verify change ID guidance reflects optional date prefix.
- Verify status vocab and relationship rules are consistent across docs.
- Verify links resolve after edits.

## T6 — Close change

- Set `tasks.md` status to `Complete` after all tasks are complete.
- Set `proposal.md` status to `Closed`.
- Confirm README/workflow state matches repository reality.

## Definition of done

- [x] Canonical artifact/status convention is documented.
- [x] All affected workflow docs use folder-per-change model.
- [x] Status vocab and relationship rules are aligned in all touched docs.
- [x] Historical migration policy is documented as opportunistic (no forced backfill).
- [x] Cross-links and documentation checklist pass.
