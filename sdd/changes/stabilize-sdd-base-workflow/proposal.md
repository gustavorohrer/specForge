# Proposal — stabilize SDD base workflow

- **Change ID:** `stabilize-sdd-base-workflow`
- **Status:** `Closed`
- **Type:** `sdd-system`
- **Date:** `2026-05-04`

## 1. Problem statement

The audit of 2026-05-04 found the SDD-for-SpecForge workflow usable but inconsistent in several concrete ways:

- Two historical changes have stale status/type values; one violates the closure rule (`install-cli-foundation` has `tasks.md` `Complete` but `proposal.md` still `Draft`).
- `docs/features/*` is an unused third documentation layer that creates confusion and redundancy with `sdd/specs/` and `sdd/changes/`. No feature has been implemented; the layer has never been exercised.
- `validate-docs.md` has an ambiguous item about `docs/features/` that does not specify when it applies.
- No canonical proposal/tasks templates exist, causing format drift across proposals.
- Status relationship rules are stated in `change-artifacts.md` and then partially restated in workflow docs without a clear pointer.

## 2. Objectives

1. Normalize stale status and type fields in historical change artifacts.
2. Remove `docs/features/*` from the active workflow and delete unused artifacts.
3. Restructure `validate-docs.md` to be change-type-aware and free of feature-layer references.
4. Add canonical templates at `sdd/changes/_template/`.
5. Point workflow docs to `change-artifacts.md` as the single source for status rules.

## 3. Scope

### In scope

- Normalizing `Status:` and `Type:` header fields in historical change artifacts (no rewriting of rationale or task bodies).
- Deleting `docs/features/_template/` and `docs/features/cli-foundation/`.
- Removing all active-workflow references to `docs/features/*`.
- Rewriting `validate-docs.md` checklist.
- Adding `sdd/changes/_template/proposal.md` and `sdd/changes/_template/tasks.md`.
- Updating `sdd/changes/README.md`, `docs/workflows/start-plan.md`, `docs/workflows/implement-task.md`, `docs/workflows/start-task.md`, `docs/conventions/documentation.md`, `docs/conventions/cli-entrypoint.md`.

### Out of scope

- Application code (`src/`, `test/`, `dist/`).
- CLI behavior, commands, flags, or output.
- New SDD workflow layers or abstractions.
- Rewriting historical proposal rationale or task bodies.

## 4. Affected files

**Created:** `sdd/changes/stabilize-sdd-base-workflow/{proposal,tasks,summary}.md`, `sdd/changes/_template/{proposal,tasks}.md`

**Deleted:** `docs/features/_template/{feature,plan,task-example}.md`, `docs/features/cli-foundation/feature.md`

**Updated (historical normalization):** `2026-04-22-define-node-typescript-cli-foundation/{proposal,tasks}.md`, `2026-04-22-install-cli-foundation/proposal.md`, `2026-04-23-strengthen-tooling-change-workflows/proposal.md`

**Updated (active docs):** `docs/workflows/{start-plan,implement-task,start-task,validate-docs}.md`, `docs/conventions/{documentation,cli-entrypoint}.md`, `sdd/changes/README.md`

## 5. Risks

- Deleting `docs/features/cli-foundation/feature.md` removes the only existing feature doc. Its substantive content (layout, rules, non-goals) is already captured in `docs/conventions/cli-entrypoint.md` and `sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`.
- Normalizing `define-node-typescript-cli-foundation/tasks.md` marks T2 (create cli-foundation feature.md) as `[x]` while the artifact is being removed by this change. The historical record correctly shows T2 was executed at the time; the removal is a subsequent action under this change.

## 6. Success criteria

- No active workflow or convention references `docs/features/*`.
- `validate-docs.md` checklist is change-type-aware with no `docs/features/` item.
- `sdd/changes/_template/` exists with both `proposal.md` and `tasks.md`.
- Historical changes have canonical status/type values and no closure rule violations.
- Status rules in workflow docs point to `change-artifacts.md`; no full restatement.
- No application code changed.
