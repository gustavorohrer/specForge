# Proposal — harden SDD workflow

- **Change ID:** `harden-sdd-workflow`
- **Status:** `Closed`
- **Type:** `sdd-system`
- **Date:** `2026-05-04`

## 1. Problem statement

A full audit of the SDD-for-SpecForge system identified several gaps that prevent the lifecycle from being fully deterministic and consistently high-quality:

- Approval is undefined: the transition from `Draft` to `In Progress` has no stated criteria or protocol. An agent has no unambiguous signal to proceed.
- No task quality floor exists for non-tooling changes: feature and sdd-system tasks can be vague without violating any rule.
- No procedure for amending a spec during execution, despite the rule requiring it.
- The spec amendment check in `validate-docs.md` is vague and does not re-run readiness conditions.
- The agent-safety checklist in `start-plan.md` duplicates `tooling-changes.md` with a vague trigger condition, creating two partial sources.
- Status reconciliation rules are partially restated in `start-task.md`, creating drift risk.
- The tasks template does not reflect the quality bar established by the best existing example.
- Git conventions are missing branch-to-change-ID correlation and multi-PR guidance.
- Open decision resolution has no stated rule in any convention.

## 2. Objectives

1. Define approval as a binary, self-contained gate with no roles or external dependencies.
2. Add a task quality floor that applies to all change types.
3. Consolidate tooling change requirements into one source (`tooling-changes.md`).
4. Add a spec amendment procedure to `write-spec.md`.
5. Strengthen the spec amendment check in `validate-docs.md`.
6. Remove status rule restatement from `start-task.md`.
7. Update the tasks template to reflect the established quality bar.
8. Complete git conventions and add open decision resolution rule.

## 3. Scope

### In scope

- `docs/workflows/start-change.md` — add approval definition.
- `docs/workflows/start-plan.md` — add task quality floor; remove agent-safety checklist; replace with single pointer.
- `docs/conventions/tooling-changes.md` — add proposal completeness section.
- `docs/workflows/write-spec.md` — add spec amendment section.
- `docs/workflows/validate-docs.md` — strengthen spec amendment check.
- `docs/workflows/start-task.md` — remove status quick-reference bullets.
- `sdd/changes/_template/tasks.md` — update to reflect quality bar.
- `docs/conventions/git.md` — add branch-name convention and multi-PR guidance.
- `docs/conventions/documentation.md` — add open decision resolution rule.
- `sdd/changes/harden-sdd-workflow/` — this change's artifacts.

### Out of scope

- Application code (`src/`, `test/`, `dist/`).
- CLI behavior, commands, or flags.
- New workflow layers or automation.
- Redesigning the status model or lifecycle.
- Modifying any existing closed change artifacts.

## 4. Risks

- Modifying many workflow docs in one change increases the risk of missing a file or introducing an inconsistency. Mitigated by explicit validation task (T10).
- The task quality floor must not over-specify for tooling tasks, which already have a higher bar via `tooling-changes.md`. The floor defines the minimum; `tooling-changes.md` adds to it.

## 5. Success criteria

- Approval is defined: a contributor can determine if a proposal is approved without subjective judgment.
- Task quality is stated: every `tasks.md` must meet the floor.
- Tooling requirements live in one place: `tooling-changes.md`.
- Spec amendment has a canonical procedure.
- `validate-docs.md` re-checks all 5 readiness conditions after amendment.
- `start-task.md` has no restated status rules.
- Tasks template reflects the established quality bar.
- Git conventions are complete for all branch types and multi-PR changes.
- Open decision resolution is explicitly required by a convention.
- No application code changed.
