# Tasks — harden SDD workflow

**Change:** `harden-sdd-workflow`
**Status:** `Complete`

## T1 — Add approval definition to start-change.md

**Produces:** A new "Approval" section in `docs/workflows/start-change.md` defining what approved means, how it is recorded, and what constitutes approval in solo or agent development.

Add an "## Approval" section after step 4. Define the approval conditions, record mechanism (status set to `In Progress` when creating `tasks.md`), and solo/agent protocol (self-review constitutes approval).

**Verify:** `docs/workflows/start-change.md` contains an "## Approval" section with explicit conditions, a solo/agent protocol, and a record mechanism.

→ **STOP** if the approval definition introduces roles, external review requirements, or subjective criteria.

## T2 — Add task quality floor to start-plan.md

**Produces:** A "Task quality requirements" section in `docs/workflows/start-plan.md` applicable to all change types.

Add the section with four requirements: state what the task produces, define completion verification, include STOP conditions when applicable, be executable without interpretation.

**Verify:** The section exists and applies to all change types. It does not conflict with `tooling-changes.md`.

→ **STOP** if the requirements overlap with or contradict tooling-specific requirements in `tooling-changes.md`.

## T3 — Consolidate tooling requirements

**Produces:** Agent-safety checklist items absorbed into `docs/conventions/tooling-changes.md` as a "Proposal completeness" section. Both overlapping sections removed from `start-plan.md`, replaced with a single "Tooling/foundation requirements" pointer section.

**Verify:** `tooling-changes.md` contains a "## Proposal completeness" section. `start-plan.md` has no "Agent-safety checklist for executable changes" section and no "Additional requirements for tooling/foundation changes" section.

→ **STOP** if any requirement from the agent-safety checklist is lost in the move.

## T4 — Add spec amendment procedure to write-spec.md

**Produces:** A new "## 9. Amending a spec during execution" section in `docs/workflows/write-spec.md`.

Add the section covering: when amendment is required, minimal change approach, readiness re-validation, and record mechanism.

**Verify:** The section exists and is consistent with `docs/conventions/spec-change-gating.md §2.2` and the spec-reality mismatch rule in `docs/conventions/documentation.md`.

→ **STOP** if the procedure contradicts the existing mismatch rule.

## T5 — Strengthen spec amendment check in validate-docs.md

**Produces:** Updated spec amendment check in `docs/workflows/validate-docs.md` that requires re-running all 5 readiness conditions.

Replace "the amendment is consistent with what was built" with a reference to all 5 conditions in `docs/conventions/spec-change-gating.md §2.2`.

**Verify:** `validate-docs.md` spec check explicitly references `spec-change-gating.md §2.2` and all 5 conditions.

## T6 — Remove status quick-reference from start-task.md

**Produces:** Step 4 in `docs/workflows/start-task.md` without restated status bullets.

Remove the four quick-reference bullets. Replace with a single pointer to `docs/conventions/change-artifacts.md`.

**Verify:** Step 4 no longer contains restatements of status semantics. The pointer to `change-artifacts.md` is present.

## T7 — Update tasks template

**Produces:** An updated `sdd/changes/_template/tasks.md` reflecting the Produces / Verify / STOP pattern.

Rewrite the template with "Produces," "Verify," and STOP condition placeholders for each task.

**Verify:** Template shows the established quality bar. Definition of done block is unchanged.

## T8 — Complete git conventions

**Produces:** `docs/conventions/git.md` with branch-name/change-ID convention and multi-PR guidance.

Add after the branch type list: the convention for using the change ID as the branch slug, and guidance for multi-PR changes.

**Verify:** `git.md` explicitly states how to correlate branch names to change IDs and how multi-PR changes are handled.

## T9 — Add open decision resolution rule

**Produces:** An explicit open decision resolution rule in `docs/conventions/documentation.md`.

Add an "## Open decisions" section defining what constitutes resolution and the mandatory `sdd/project.md` update.

**Verify:** `documentation.md` states that a resolved decision must update `sdd/project.md` and link the resolving change.

## T10 — Validate system consistency

**Produces:** Confirmation that all modified docs are consistent and no rules are duplicated or contradicted.

Check: no status rules restated outside `change-artifacts.md`, no spec readiness conditions restated outside `spec-change-gating.md`, lifecycle is deterministic at approval/execution start/closure, no broken internal links in modified files.

**Verify:** Each modified file links correctly. No contradictions between docs.

→ **STOP** if any contradiction or broken link is found. Fix before closing.

## T11 — Close change

**Produces:** `summary.md` created. `tasks.md` set to `Complete`. `proposal.md` set to `Closed`.

**Verify:** All definition-of-done items are `[x]`. `summary.md` exists.

## Definition of done

- [x] T1 complete.
- [x] T2 complete.
- [x] T3 complete.
- [x] T4 complete.
- [x] T5 complete.
- [x] T6 complete.
- [x] T7 complete.
- [x] T8 complete.
- [x] T9 complete.
- [x] T10 complete.
- [x] T11 complete.
- [x] `docs/workflows/validate-docs.md` checklist passes.
