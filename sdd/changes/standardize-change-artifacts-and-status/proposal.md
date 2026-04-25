# Proposal — standardize change artifacts and status

- **Change ID:** `standardize-change-artifacts-and-status`
- **Status:** `Closed`
- **Type:** `sdd-system`
- **Date:** `2026-04-25`

## 1. Problem statement

SpecForge currently uses folder-per-change artifacts in practice, but parts of the documentation still prescribe a single-file change model with an embedded `## Plan` section. Status values are also inconsistent across proposals and tasks, which creates ambiguity about whether a change is active or closed.

## 2. Scope

### In scope

- Define one canonical change artifact model for SpecForge SDD changes.
- Define the purpose and required content boundary for `proposal.md` and `tasks.md`.
- Define whether `design.md` exists and under what condition.
- Define valid status vocabularies for proposal-level and task-level tracking.
- Define a strict closure rule for a change.
- Define migration policy for historical change artifacts.

### Out of scope

- Any application code, CLI behavior, or `specforge init` work.
- Redesigning the full SDD lifecycle or adding automation/tooling enforcement.
- Rewriting historical proposal/task narrative content.

## 3. Canonical change artifact model

All new changes must use:

```
sdd/changes/<change-id>/
  proposal.md
  tasks.md
  design.md (optional)
```

`<change-id>` format: kebab-case slug is required; date prefix is optional.

Valid examples:

- `standardize-change-artifacts-and-status`
- `2026-04-25-standardize-change-artifacts-and-status`

## 4. Artifact purpose

### `proposal.md` (required)

Purpose: decision record and scope boundary.

Must include:

- Problem statement
- Objectives
- Scope / out of scope
- Risks / unknowns
- Success criteria
- Type and status

Must not include:

- Task execution checklist
- Step-by-step implementation plan

### `tasks.md` (required)

Purpose: execution plan and task tracking for an approved/in-flight proposal.

Must include:

- Task list (atomic, reviewable)
- Verification steps
- Status tracking for task progress

Must not redefine proposal decisions; it operationalizes them.

### `design.md` (optional)

Allowed only when a change needs non-trivial design detail (for example cross-cutting structure, alternatives/tradeoffs, interface shape) that would overload `proposal.md`.

If absent, proposal/tasks remain fully valid.

## 5. Status semantics

### 5.1 Proposal statuses (valid values)

- `Draft`
- `In Progress`
- `Closed`
- `Superseded` (optional)

### 5.2 Tasks file statuses (valid values)

- `Draft`
- `In Progress`
- `Complete`
- `Blocked`

### 5.3 Task item markers (valid values)

- `[ ]` not started
- `[~]` in progress
- `[x]` complete
- `[-]` blocked (must include blocker note)

### 5.4 Status relationship rules

- If any task is in progress (`[~]`) or `tasks.md` status is `In Progress`, `proposal.md` status must be `In Progress`.
- If `tasks.md` status is `Blocked`, `proposal.md` status must be `In Progress`.
- `tasks.md` is the source of truth for execution completeness.
- If proposal/tasks status fields disagree, execution state is determined from `tasks.md`, and proposal status must be reconciled.

## 6. Closure rule

A change is considered closed only when all are true:

1. `tasks.md` status is `Complete`.
2. No unresolved task markers remain (`[ ]`, `[~]`, `[-]`) unless explicitly moved to a successor change.
3. `proposal.md` status is `Closed`.
4. Documentation validation checklist passes for affected docs.

Mandatory closure order:

- `proposal.md` must not be set to `Closed` before `tasks.md` is `Complete`.

## 7. Historical migration policy

Historical changes are not required to be normalized immediately.
Normalization is required only when touching an existing change artifact for other work (opportunistic cleanup).

## 8. Success criteria

- No doc in `docs/workflows/`, `docs/conventions/`, or `sdd/changes/README.md` prescribes the single-file model.
- Status values are deterministic and used consistently.
- A contributor can determine if a change is open/active/closed from headers and task state alone.
- Historical status normalization occurs opportunistically when legacy changes are modified.

## 9. Risks

- Opportunistic migration may leave mixed historical states for some time.
- If status rules are not enforced in review, proposal/tasks may drift.
- Updating multiple docs may miss one stale reference.

## See also

- `AGENTS.md`
- `docs/conventions/spec-change-gating.md`
- `docs/workflows/start-change.md`
- `docs/workflows/start-plan.md`
- `docs/workflows/start-task.md`
