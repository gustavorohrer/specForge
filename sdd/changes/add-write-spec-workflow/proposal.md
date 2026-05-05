# Proposal — add write-spec workflow

- **Change ID:** `add-write-spec-workflow`
- **Status:** `Closed`
- **Type:** `sdd-system`
- **Date:** `2026-05-04`

## 1. Problem statement

The spec-first gate for `feature` changes is defined in `docs/conventions/spec-change-gating.md` and enforced in `docs/workflows/start-change.md`. However, no workflow documents *how* to create or mature a spec. Contributors who need to write a spec for the first time have no canonical procedure: no workflow entry point, no template, no readiness checklist specific to authoring, and no guidance on integrating the spec into the change lifecycle.

This leaves a gap in the SDD system between the rule ("spec must be ready before feature proposal") and the tooling to satisfy it.

## 2. Objectives

1. Provide an official workflow document for creating and maturing formal specs in `sdd/specs/`.
2. Include a canonical spec template so authors have a consistent starting point.
3. Define spec-ready criteria in the workflow (linking to the binding convention).
4. Wire the workflow into the existing feature-change path with minimal linkage changes.

## 3. Scope

### In scope

- Create `docs/workflows/write-spec.md` as the official spec-authoring workflow.
- Include: idea-to-creation steps, how to write the spec, ready criteria, ambiguity detection rules, integration with changes, lifecycle checkpoints, failure modes, and linkage rules.
- Include the canonical spec template inside the workflow.
- Add a reference to `docs/workflows/write-spec.md` from `docs/workflows/start-change.md` under feature preconditions.
- Add a pointer from `sdd/specs/README.md` to `docs/workflows/write-spec.md`.
- Add a pointer from `AGENTS.md` (intent table) since no "Write a spec" entry currently exists.

### Out of scope

- Any application code, CLI behavior, or `specforge init` work.
- New automation or slash commands.
- Redesign of existing workflows.
- Branches or PR workflow.
- Spec files for any specific feature (this change only creates the authoring tooling).

## 4. Affected files

- `docs/workflows/write-spec.md` — created
- `docs/workflows/start-change.md` — one-line addition under feature precondition
- `sdd/specs/README.md` — one-line pointer addition
- `AGENTS.md` — one row added to intent table

## 5. Risks

- The workflow must not conflict with `docs/conventions/spec-change-gating.md`. Readiness criteria in the workflow are derived from the convention; the convention remains the binding source.
- Minimal linkage means the workflow will only be reachable from the two defined entry points initially. This is acceptable and intentional.

## 6. Success criteria

- `docs/workflows/write-spec.md` exists and covers all required sections.
- A contributor following `docs/workflows/start-change.md` for a `feature` change is directed to the spec workflow when no ready spec exists.
- `sdd/specs/README.md` links to the workflow.
- `AGENTS.md` intent table has a "Write a spec for a feature" entry.
- No instructions conflict with `docs/conventions/spec-change-gating.md`.
- No application code changed.
