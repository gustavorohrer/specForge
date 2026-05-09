# Workflow — implement a task

Use this to execute one atomic task from a plan.

## Steps

1. **Reread the task and plan** in `sdd/changes/<change-id>/tasks.md` and `proposal.md`. If the task is unclear, stop and revise `tasks.md` first.

   Before writing code, read the convention documents relevant to your task:
   - Always: [`docs/conventions/architecture.md`](../conventions/architecture.md), [`docs/conventions/typescript.md`](../conventions/typescript.md)
   - If writing filesystem operations: [`docs/conventions/filesystem-safety.md`](../conventions/filesystem-safety.md)
   - If adding a new command or error mode: [`docs/conventions/errors.md`](../conventions/errors.md)
   - If writing tests: [`docs/conventions/testing.md`](../conventions/testing.md)

2. **Implement the minimum** required to satisfy the task.
   - Do not exceed the task's scope.
   - If scope drift becomes necessary, stop and update the plan.
   - Do not adjust adjacent code, formatting, or documentation that the task did not require changing. If you notice an issue outside the task's scope, mention it — do not fix it.
3. **Update docs** that describe changed behavior, **in the same commit**. See `docs/conventions/documentation.md`.
4. **Verify** per [`docs/conventions/quality-gates.md`](../conventions/quality-gates.md).
   - If any source, config, or test file changed: run `pnpm run typecheck`, then `pnpm run lint`, then `pnpm run test`, then `pnpm run build` — each must exit 0 before running the next.
   - If writing filesystem operations: confirm compliance with `docs/conventions/filesystem-safety.md`.
   - If introducing a new error mode: confirm compliance with `docs/conventions/errors.md`.
   - For docs-only `sdd-system` changes: run `docs/workflows/validate-docs.md` only.
5. **Commit** following `docs/conventions/git.md`. Reference `proposal.md` and `tasks.md` in the commit body.
6. **Mark the task complete** in `tasks.md` (`- [x]`).
7. **Reconcile statuses** per `docs/conventions/change-artifacts.md`.
   - Keep `proposal.md` at `In Progress` while any task is still open or blocked.
   - Set `tasks.md` to `Complete` only when all task items are complete.
   - Set `proposal.md` to `Closed` only after `tasks.md` is `Complete`.

## Output

A single, reviewable commit (or a tight sequence of commits) implementing one task.

## Probe-first validation (tooling tasks)

If a task depends on a tooling assumption that has not been empirically verified, run a **validation probe** before the task's main body executes:

- Confirm the tool version: `tool --version` and compare against the spec's pinned version.
- Confirm a specific behavior: build a trivial input and inspect the output before relying on it.

If a probe fails, stop. Do not adapt around the failure at the implementation layer. Revise the spec first.

See `docs/conventions/tooling-changes.md` for examples and the full requirement.

## Documentation sync check

Before marking a task or change complete, verify whether the implementation affected any of:

- Confirmed decisions (`sdd/project.md`).
- Project structure (directories, entrypoints, layout).
- Workflows (`docs/workflows/`).
- Conventions (`docs/conventions/`).
- User-facing behavior (CLI output, flags, exit codes).

If yes, update the corresponding source-of-truth document **in the same change**. See `docs/conventions/documentation.md`.

## Next

- More tasks pending → back to `docs/workflows/start-task.md`.
- All tasks complete → `docs/workflows/validate-docs.md`.
