# Proposal — define engineering quality conventions

- **Change ID:** `define-engineering-quality-conventions`
- **Status:** `Closed`
- **Type:** `sdd-system`
- **Date:** 2026-05-09

## 1. Problem statement

SpecForge has a mature SDD workflow and a confirmed implementation stack, but no technical engineering conventions for the implementation code itself. The first command implementation is imminent. Without conventions defining architecture, error handling, filesystem safety, testing strategy, TypeScript usage, and quality gates, each implementation task would require agents and developers to invent patterns ad-hoc — leading to inconsistency, poor testability, and preventable defects.

## 2. Objectives

1. Define the architecture rules (three-layer model) for all implementation code.
2. Define the testing strategy and patterns specific to this project.
3. Define error handling, stdout/stderr, and exit code conventions.
4. Define filesystem safety rules for a file-writing CLI.
5. Define TypeScript coding rules beyond `tsconfig.json`.
6. Define the minimum quality gate required before any task is declared complete.
7. Update `AGENTS.md` and `implement-task.md` to reference the new conventions.

## 3. Scope

### In scope

- Creating 6 new convention documents under `docs/conventions/`:
  - `architecture.md`
  - `testing.md`
  - `errors.md`
  - `filesystem-safety.md`
  - `typescript.md`
  - `quality-gates.md`
- Updating `docs/conventions/base.md` to reference all new documents.
- Updating `docs/workflows/implement-task.md` to reference the quality gate and convention docs.
- Updating `AGENTS.md` to direct agents to the new convention docs before implementing code.

### Out of scope

- Adding `pnpm run validate` to `package.json` — requires a separate `tooling/foundation` change per `docs/conventions/cli-entrypoint.md`.
- Implementing any application code.
- Creating spec files under `sdd/specs/`.
- Adding CI configuration.
- Defining coverage thresholds (an open decision in `sdd/project.md`).
- Modifying any SDD change artifacts outside this change folder.

## 4. Risks

- Rules written before code exists may need amendment when the first command is implemented. Mitigated by the existing SDD spec-amendment protocol: stop, revise the convention, confirm readiness, continue.
- Documents may overlap with existing `cli-entrypoint.md`. Mitigated by explicit scope boundaries and cross-links rather than duplication.
- `validate` script is not yet available — the quality gate must be run manually. Mitigated by documenting the manual equivalent in `quality-gates.md`.

## 5. Success criteria

- 6 new convention documents exist and are internally consistent.
- No rule is duplicated across documents — cross-links are used instead.
- `AGENTS.md` directs agents to the new docs before implementing code.
- `implement-task.md` references the quality gate explicitly.
- A new contributor (human or agent) can implement a command with no ambiguity about architecture, error handling, or testing pattern.
- No source code was modified.
