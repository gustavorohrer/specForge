# Workflow — start a task

Use this to pick up a single task from an approved plan.

## Steps

1. **Identify the task** in `sdd/changes/<change-id>/tasks.md`.
2. **Confirm preconditions:**
   - All tasks the selected one depends on are complete.
   - You understand the verification criteria for this task.
3. **Create a working branch** per `docs/conventions/git.md`.
4. **Claim the task** in `tasks.md`. Status semantics and relationship rules are defined in `docs/conventions/change-artifacts.md`. Quick reference:
   - Mark the task item as in progress: `[~]`.
   - Set `tasks.md` status to `In Progress` when execution starts.
   - Set `proposal.md` status to `In Progress` when any task is in progress.
   - If `tasks.md` status becomes `Blocked`, keep `proposal.md` as `In Progress`.

## Output

A branch and a clearly claimed task in `tasks.md`, ready for implementation.

## Next

→ `docs/workflows/implement-task.md`.
