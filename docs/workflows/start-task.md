# Workflow — start a task

Use this to pick up a single task from an approved plan.

## Steps

1. **Identify the task** in the change file's `## Plan` section.
2. **Confirm preconditions:**
   - All tasks the selected one depends on are complete.
   - You understand the verification criteria for this task.
3. **Create a working branch** per `docs/conventions/git.md`.
4. **Claim the task** — mark it in progress in the plan (e.g. `- [~] task description`) or leave a comment in the change file.

## Output

A branch and a clearly claimed task, ready for implementation.

## Next

→ `docs/workflows/implement-task.md`.
