# Changes

Change proposals and execution tasks. One folder per change.

## Conventions

- Folder format: `sdd/changes/<change-id>/`
- Required files:
  - `proposal.md` — decision record and scope boundary
  - `tasks.md` — execution plan and task tracking
- Optional file:
  - `design.md` — only for non-trivial design detail
- Change ID format:
  - Kebab-case slug required
  - Date prefix optional (for example `2026-04-25-<slug>`)
- Status semantics and closure rules:
  - See `docs/conventions/change-artifacts.md`
- Workflows:
  - Start a proposal: `docs/workflows/start-change.md`
  - Create task plan: `docs/workflows/start-plan.md`
  - Execute tasks: `docs/workflows/start-task.md` → `docs/workflows/implement-task.md`
