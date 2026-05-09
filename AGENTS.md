# AGENTS.md

This repository is developed using **Spec-Driven Development (SDD)**.
Every meaningful change must be preceded by a specification, a change proposal, or a plan.

This file is the **operating contract** for all contributors, human or agent.

## 1. Read before writing

Before making any change, read:

1. `sdd/project.md` — objective, scope, principles, current status.
2. `sdd/changes/` — currently active change proposals and plans.
3. Relevant files in `docs/conventions/` and `docs/workflows/`.

Do not skip this step.

## 2. No meaningful implementation without a spec

- Meaningful code or structural changes require an approved **change proposal** or **plan** in `sdd/changes/`.
- Trivial edits are exempt: typo fixes, comment cleanup, obvious bug fixes confined to a single function.
- If a change grows past its approved plan, **stop and revise the plan** — do not extend scope silently.

## 3. Small, atomic changes

- One coherent outcome per change proposal.
- Break each plan into tasks that are individually reviewable.
- Prefer several small, landable steps to one large sweeping PR.

## 4. Docs stay in sync with behavior

- When behavior or workflows change, update `docs/` in the **same change**.
- Stale documentation is a bug.
- `README.md` status section must match reality.

## 5. Clarity and minimalism over cleverness

- Write the smallest, clearest thing that solves the problem.
- Do not introduce abstractions, configuration, or indirection for hypothetical future needs.
- Do not add IDE-specific setup to the repository.
- Do not add features, files, or dependencies that the current task does not require.

## 6. Non-destructive by default

- Prefer additive edits over rewrites.
- If an existing file must be replaced, keep the diff reviewable.
- Never clobber in-progress work without explicit confirmation.

## Where to start, by intent

| Intent | Start here |
|---|---|
| Understand the project | `sdd/project.md` |
| Write a spec for a feature | `docs/workflows/write-spec.md` |
| Propose a change | `docs/workflows/start-change.md` |
| Turn a change into a plan | `docs/workflows/start-plan.md` |
| Pick up a task | `docs/workflows/start-task.md` |
| Execute a task | `docs/workflows/implement-task.md` |
| Validate before merge | `docs/workflows/validate-docs.md` |

## 7. Surface ambiguity before acting

When starting any stage of work, if your interpretation of a spec, proposal, or task is not uniquely determined, state your reading explicitly before proceeding. Do not resolve ambiguity through an undisclosed interpretive choice.

If the required interpretation cannot be derived from the existing documents, stop. Name what is unclear. Revise the appropriate document or ask.

## 8. Before implementing code

Before writing any implementation, read the convention documents relevant to your task:

| Always read | Document |
|---|---|
| Layer model, DI rule | [`docs/conventions/architecture.md`](./docs/conventions/architecture.md) |
| TypeScript coding rules | [`docs/conventions/typescript.md`](./docs/conventions/typescript.md) |

| Read when applicable | When |
|---|---|
| [`docs/conventions/errors.md`](./docs/conventions/errors.md) | Adding a new command or error surface |
| [`docs/conventions/filesystem-safety.md`](./docs/conventions/filesystem-safety.md) | Writing any code that creates or modifies files |
| [`docs/conventions/testing.md`](./docs/conventions/testing.md) | Writing tests |
| [`docs/conventions/quality-gates.md`](./docs/conventions/quality-gates.md) | Before marking a task complete |

Do not mark a task complete without running the quality gate defined in `docs/conventions/quality-gates.md`.

## Agent-agnostic

Claude Code is the primary agent used today, but nothing in this repository is Claude-specific. Any capable coding agent should be able to follow `AGENTS.md` and the workflows under `docs/workflows/` to contribute correctly.
