# Workflow — start a plan

Use this once a change proposal has been approved and it's time to decide **how** to execute it.

## Steps

1. **Open the approved change file** in `sdd/changes/`.
2. **Append a `## Plan` section** to the same file, containing:
   - **Approach** — short, high-level strategy.
   - **Impacted files / areas** — list of files, modules, or docs that will change.
   - **Tasks** — atomic, independently reviewable steps. Use checkboxes.
   - **Verification** — how we will confirm the change works end-to-end.
   - **Rollback** — how to revert if needed.
3. **If the change introduces or reshapes a feature**, create `docs/features/<feature-name>/` from `docs/features/_template/`.
4. **Stop at the plan level.** Do not implement yet. Request review.

## Output

- An approved plan inside the change file.
- If applicable, a new feature directory under `docs/features/`.

## Change classification

Every change proposal must declare its type in the header:

| Type | Meaning |
|---|---|
| `feature` | Adds or modifies user-facing behavior |
| `tooling/foundation` | Installs, upgrades, or reconfigures dev tools, build tools, runtimes, or package manager |
| `sdd-system` | Modifies workflows, conventions, or SDD structure — no application code |
| `fix` | Corrects a defect in an existing feature or configuration |

Classification determines which requirements apply. A `tooling/foundation` change triggers the full checklist in `docs/conventions/tooling-changes.md`.

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
