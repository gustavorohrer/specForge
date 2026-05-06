# Workflow — start a plan

Use this once a change proposal has been approved and it's time to decide **how** to execute it.

## Steps

1. **Open the approved change folder** in `sdd/changes/<change-id>/`.
2. **Review `proposal.md`** and confirm:
   - Scope and out-of-scope are explicit.
   - Type/classification is explicit.
   - Feature changes link a ready spec when required.
3. **Create `tasks.md`** (or complete it if partially drafted), containing:
   - **Status** — initial status is `Draft`.
   - **Tasks** — atomic, independently reviewable steps with task markers.
   - **Verification** — how we will confirm the change works end-to-end.
   - **Definition of done** — explicit closure checks.
4. **Stop at the plan level.** Do not implement yet. Request review.

## Output

- A reviewed `tasks.md` in the change folder.
- Status handling and closure semantics follow `docs/conventions/change-artifacts.md`.

## Change classification

Every change proposal must declare its type in the header:

| Type | Meaning |
|---|---|
| `feature` | Adds or modifies user-facing behavior |
| `tooling/foundation` | Installs, upgrades, or reconfigures dev tools, build tools, runtimes, or package manager |
| `sdd-system` | Modifies workflows, conventions, or SDD structure — no application code |
| `fix` | Corrects a defect in an existing feature or configuration |

Classification determines which requirements apply. A `tooling/foundation` change triggers the full checklist in `docs/conventions/tooling-changes.md`.

## Spec gate for feature changes

Before planning any `feature` change, verify the proposal references a ready spec in `sdd/specs/` and that readiness is satisfied per `docs/conventions/spec-change-gating.md`.

If the proposal has no linked ready spec, planning is invalid. Send the change back to proposal stage.

## Target stack check for output-generating changes

Any `feature` or `sdd-system` change that generates output into user projects — templates, scaffolded files, SDD artifacts, or conventions written into a target repository — must, before the plan is approved:

- Declare which target stack(s) the change affects (e.g. `generic`, `node-typescript`, `go`).
- Confirm the generated output contains no Node.js, TypeScript, or pnpm assumptions unless the target stack is explicitly `node-typescript`.
- Be consistent with the binding rule and preset model in [`docs/conventions/target-stack.md`](../conventions/target-stack.md).

Changes that skip this check must be sent back to the proposal stage.

## Task quality requirements

Every task in `tasks.md` must, regardless of change type:

- **State exactly what it produces.** Name the artifact(s) or state change the task creates.
- **Define how completion is verified.** Include a check that can be run or inspected to confirm the task is done.
- **Include STOP conditions when applicable.** If a precondition fails or an assumption is violated, state explicitly what to do.
- **Be executable without interpretation.** A contributor (human or agent) must be able to execute the task without resolving ambiguity on the fly.

Tasks that do not meet these requirements must be revised before execution begins.

## Tooling/foundation requirements

For `tooling/foundation` changes, verify the proposal against the full checklist in `docs/conventions/tooling-changes.md` before proceeding to planning. That checklist covers versioning, compatibility assumptions, cross-cutting concern ownership, validation probes, and proposal completeness.

A `tooling/foundation` proposal that fails any item in that checklist must be sent back to draft.

## Next

Once approved → `docs/workflows/start-task.md`.
