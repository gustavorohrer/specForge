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

## Agent-safety checklist for executable changes

If the change involves installing tooling, creating config files, or defining a technical foundation, the proposal must explicitly include:

- **Exact artifacts** to create or modify — enumerated, no ambiguity.
- **Decision lock** — a statement that the change executes (not re-opens) prior decisions.
- **Configuration constraints** — per-file rules when config files are created (minimal, no advanced settings, no environment-specific values).
- **Execution constraints** — prohibitions on side work, extra deps, refactors, or abstractions.
- **Explicit out-of-scope items** — including deferred decisions that a reader might otherwise assume are in scope.
- **Explicit prohibitions for the agent** — "do not" bullets for the most likely wrong turns.

Changes that skip these sections must be sent back to the proposal stage.

## Additional requirements for tooling/foundation changes

When the change type is `tooling/foundation`, also verify against the full checklist in `docs/conventions/tooling-changes.md` before approving the proposal. That checklist covers:

- Exact version pinning (no `latest`, no ranges)
- Compatibility assumptions section (runtime versions, cross-package constraints, changelog verification)
- Cross-cutting concern ownership (single declared owner per shared artifact)
- Validation probes required in tasks for unverified assumptions

A `tooling/foundation` proposal that omits any item from that checklist must be sent back.

## Next

Once approved → `docs/workflows/start-task.md`.
