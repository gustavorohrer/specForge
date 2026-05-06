# Summary — harden SDD workflow

**Change:** `harden-sdd-workflow`
**Closed:** `2026-05-04`

## What changed

Nine targeted edits to the SDD system, no new layers introduced.

### Approval defined (`start-change.md`)

Added an "## Approval" section with a binary checklist and an explicit solo/agent protocol: self-review constitutes approval; record by setting `proposal.md` to `In Progress` when creating `tasks.md`.

### Task quality floor (`start-plan.md`)

Added "## Task quality requirements" — four requirements that apply to every task in every change type: state what it produces, define completion verification, include STOP conditions, be executable without interpretation.

### Tooling requirements consolidated (`start-plan.md` + `tooling-changes.md`)

Removed the "Agent-safety checklist for executable changes" and "Additional requirements for tooling/foundation changes" sections from `start-plan.md`. Absorbed the agent-safety items into a new "## Proposal completeness" section in `tooling-changes.md`. Replaced both removed sections with a single "## Tooling/foundation requirements" pointer.

### Spec amendment procedure (`write-spec.md`)

Added "## 9. Amending a spec during execution" — defines when amendment is required, how to apply minimal changes, how to re-validate readiness, and how to record the amendment in `tasks.md`.

### Validate-docs strengthened (`validate-docs.md`)

Replaced the vague spec amendment check with an explicit requirement to re-run all 5 readiness conditions from `spec-change-gating.md §2.2`.

### Status restatement removed (`start-task.md`)

Removed the four quick-reference status bullets from step 4. Replaced with a single pointer to `docs/conventions/change-artifacts.md`.

### Tasks template updated (`_template/tasks.md`)

Rewrote template to reflect the Produces / Verify / STOP condition pattern established by `install-cli-foundation/tasks.md`.

### Git conventions completed (`git.md`)

Added: change-ID-as-slug convention for branch naming; multi-PR handling guidance.

### Open decision rule added (`documentation.md`)

Added "## Open decisions" — defines what constitutes resolution and makes the `sdd/project.md` update mandatory in the same change.

## What did not change

- Status model, lifecycle structure, or closure rules.
- `change-artifacts.md`, `spec-change-gating.md`, `AGENTS.md`.
- Application code.
- Any existing closed change artifact.
