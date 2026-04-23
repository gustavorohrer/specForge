# Workflow — implement a task

Use this to execute one atomic task from a plan.

## Steps

1. **Reread the task and plan** in the relevant change file. If the task is unclear, stop and revise the plan first.
2. **Implement the minimum** required to satisfy the task.
   - Do not exceed the task's scope.
   - If scope drift becomes necessary, stop and update the plan.
3. **Update docs** that describe changed behavior, **in the same commit**. See `docs/conventions/documentation.md`.
4. **Verify** per the plan's verification strategy — tests, manual run, lint, type-check, etc.
5. **Commit** following `docs/conventions/git.md`. Reference the change file in the commit body.
6. **Mark the task complete** in the plan (`- [x]`).

## Output

A single, reviewable commit (or a tight sequence of commits) implementing one task.

## Documentation sync check

Before marking a task or change complete, verify whether the implementation affected any of:

- Confirmed decisions (`sdd/project.md`).
- Project structure (directories, entrypoints, layout).
- Workflows (`docs/workflows/`).
- Conventions (`docs/conventions/`).
- Feature-layer docs (`docs/features/`).
- User-facing behavior (CLI output, flags, exit codes).

If yes, update the corresponding source-of-truth document **in the same change**. See `docs/conventions/documentation.md`.

## Next

- More tasks pending → back to `docs/workflows/start-task.md`.
- All tasks complete → `docs/workflows/validate-docs.md`.
