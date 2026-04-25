# Convention — change artifacts and status

This convention defines the canonical artifact model and status semantics for changes in `sdd/changes/`.

## 1. Canonical change folder

Every change lives in a dedicated folder:

```text
sdd/changes/<change-id>/
  proposal.md
  tasks.md
  design.md (optional)
```

`<change-id>` must be kebab-case. A date prefix is optional.

Valid examples:

- `standardize-change-artifacts-and-status`
- `2026-04-25-standardize-change-artifacts-and-status`

## 2. Artifact purpose

### 2.1 `proposal.md` (required)

Purpose: decision record and scope boundary.

Expected content:

- Problem statement
- Objectives
- Scope and out of scope
- Risks and unknowns
- Success criteria
- Change type and status

Must not contain execution checklist details that belong in `tasks.md`.

### 2.2 `tasks.md` (required)

Purpose: execution plan and task tracking for the change.

Expected content:

- Atomic tasks
- Verification steps
- Status tracking at file and task-item level

`tasks.md` operationalizes `proposal.md`; it does not redefine proposal decisions.

### 2.3 `design.md` (optional)

Use `design.md` only when design detail would overload `proposal.md` (for example architecture options, cross-cutting tradeoffs, interface design notes).

## 3. Status model

### 3.1 Proposal statuses

Valid values:

- `Draft`
- `In Progress`
- `Closed`
- `Superseded` (optional)

### 3.2 Tasks statuses

Valid values:

- `Draft`
- `In Progress`
- `Complete`
- `Blocked`

### 3.3 Task item markers

Valid markers:

- `[ ]` not started
- `[~]` in progress
- `[x]` complete
- `[-]` blocked (must include blocker note)

## 4. Relationship rules

- If any task item is `[~]`, `proposal.md` must be `In Progress`.
- If `tasks.md` status is `In Progress`, `proposal.md` must be `In Progress`.
- If `tasks.md` status is `Blocked`, `proposal.md` must be `In Progress`.
- `tasks.md` is the source of truth for execution completeness.
- If proposal/tasks status fields disagree, reconcile proposal status to match `tasks.md` execution state.

## 5. Closure rule

A change is closed only when all conditions are true:

1. `tasks.md` status is `Complete`.
2. No unresolved task markers remain (`[ ]`, `[~]`, `[-]`) unless explicitly moved to a successor change.
3. `proposal.md` status is `Closed`.
4. Documentation validation passes for affected docs.

Mandatory order:

- `proposal.md` must not be set to `Closed` before `tasks.md` is `Complete`.

## 6. Historical changes

Historical changes do not require immediate repository-wide normalization.
Normalize legacy status metadata opportunistically when touching those change artifacts for other work.
