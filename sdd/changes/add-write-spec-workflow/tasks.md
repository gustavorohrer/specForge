# Tasks — add write-spec workflow

**Change:** `add-write-spec-workflow`
**Status:** `Complete`

## T1 — Create `docs/workflows/write-spec.md`

Create the official spec-authoring workflow with all required sections:
- Purpose and when to use
- Inputs and output
- Idea → spec creation steps
- How to write the spec (with canonical template)
- Spec ready criteria
- Ambiguity detection rules
- Integration with changes
- Lifecycle and checkpoints
- Failure modes and required actions
- Minimal linkage rules

## T2 — Update `docs/workflows/start-change.md`

Add a pointer to `docs/workflows/write-spec.md` in step 1 under the feature precondition, after the line "Create or finish the spec first."

## T3 — Update `sdd/specs/README.md`

Add a one-line pointer to `docs/workflows/write-spec.md` for contributors who need to create or mature a spec.

## T4 — Update `AGENTS.md`

Add a "Write a spec for a feature" row to the intent table pointing to `docs/workflows/write-spec.md`.

## T5 — Validate consistency

- Verify write-spec.md readiness criteria match `docs/conventions/spec-change-gating.md §2.2`.
- Verify no instructions across the modified files conflict.
- Verify the workflow is reachable from the feature-change path.
- Verify no application code changed.

## T6 — Close change

- Set `tasks.md` status to `Complete`.
- Set `proposal.md` status to `Closed`.

## Definition of done

- [x] `docs/workflows/write-spec.md` exists with all required sections and canonical spec template.
- [x] `docs/workflows/start-change.md` directs feature contributors to `write-spec.md`.
- [x] `sdd/specs/README.md` links to `write-spec.md`.
- [x] `AGENTS.md` intent table has a write-spec entry.
- [x] No conflict with `docs/conventions/spec-change-gating.md`.
- [x] No application code changed.
